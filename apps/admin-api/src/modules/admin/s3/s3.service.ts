import { PrismaService, StorageType } from '@aiknew/shared-admin-db'
import { Injectable } from '@nestjs/common'
import { FileStorageService } from '../file-storage/file-storage.service'
import { S3WebhookBodyDto, UploadS3FileDto } from './dto'
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { AppBadRequestException } from '@aiknew/shared-api-exceptions'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3EventsEnum, S3PresignedFieldsEnum } from './enum'
import { basename, extname, join } from 'node:path'
import { rm } from 'node:fs/promises'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class S3Service {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileStorageService: FileStorageService,
    private readonly configService: ConfigService,
  ) {}

  get model() {
    return this.prisma.uploadFile
  }

  async getS3Client() {
    const storage = await this.fileStorageService.getActiveStorage()
    const bucket = storage.bucket

    if (storage.type === StorageType.S3 && bucket) {
      const client = new S3Client({
        region: 'us-east-1',
        endpoint: storage.endpoint ?? '',
        credentials: {
          accessKeyId: storage.accessKey ?? '',
          secretAccessKey: storage.secretKey ?? '',
        },
        // forcePathStyle: true,
      })

      return {
        client,
        storage: {
          ...storage,
          bucket,
        },
      }
    }

    throw new AppBadRequestException('There is no active s3 storage')
  }

  async getPresignedPost(
    fileGroupId: string,
    uploaderId: string,
    uploadChannel: string = '10',
  ) {
    const { client, storage } = await this.getS3Client()
    const { fields, url } = await createPresignedPost(client, {
      Bucket: storage.bucket ?? '',
      Key: '${filename}',
      Expires: 3600,
      Fields: {
        [S3PresignedFieldsEnum['X-Amz-Meta-Groupid']]: fileGroupId,
        [S3PresignedFieldsEnum['X-Amz-Meta-Channel']]: uploadChannel,
        [S3PresignedFieldsEnum['X-Amz-Meta-Uploaderid']]: uploaderId,
      },
      Conditions: [
        ['eq', `$${S3PresignedFieldsEnum['X-Amz-Meta-Groupid']}`, fileGroupId],
        [
          'eq',
          `$${S3PresignedFieldsEnum['X-Amz-Meta-Channel']}`,
          uploadChannel,
        ],
        [
          'eq',
          `$${S3PresignedFieldsEnum['X-Amz-Meta-Uploaderid']}`,
          uploaderId,
        ],
        ['content-length-range', 0, 5 * 1024 * 1024],
      ],
    })

    return {
      fields,
      url,
    }
  }

  async checkS3File(bucketName: string, objectKey: string) {
    const { client } = await this.getS3Client()

    const headObjectCommand = new HeadObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    })

    const ret = await client.send(headObjectCommand) // or s3Client.send(getObjectAttributesCommand)

    return ret
  }

  async deleteS3FileFromBucket(data: { bucket: string; key: string }) {
    const { bucket, key } = data
    const { client } = await this.getS3Client()
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
    return await client.send(command)
  }

  async deleteAllTemporaryDeletedFiles() {
    return await this.model.deleteMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
    })
  }

  async temporaryDeleteS3FileFromDB(data: {
    groupId: string
    originalName: string
  }) {
    const { groupId, originalName } = data
    await this.model.update({
      where: {
        originalName_groupId: {
          groupId,
          originalName,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async deleteS3File(data: {
    groupId: string
    originalName: string
    bucket: string
    key: string
  }) {
    const { bucket, key, groupId, originalName } = data
    return Promise.allSettled([
      this.temporaryDeleteS3FileFromDB({ groupId, originalName }),
      this.deleteS3FileFromBucket({ bucket, key }),
    ]).then(() => {
      this.deleteAllTemporaryDeletedFiles()
    })
  }

  async deleteLocalStorageFile(localFilePath: string) {
    const publicFolderLocation = this.configService.get<string>(
      'common.publicFolder',
    )
    if (publicFolderLocation) {
      await rm(join(publicFolderLocation, localFilePath), { force: true })
    }
  }

  async upsertFileRecord(data: UploadS3FileDto) {
    const activeStorage = await this.fileStorageService.getActiveStorage()
    const existFile = await this.model.findUnique({
      where: {
        originalName_groupId: {
          groupId: data.groupId,
          originalName: data.originalName,
        },
      },
      include: {
        storage: true,
      },
    })

    if (existFile && existFile.storage.id !== activeStorage.id) {
      // delete the exist file asset
      if (existFile.storage.type === 'LOCAL') {
        this.deleteLocalStorageFile(existFile.filePath)
      }

      if (existFile.storage.type === 'S3' && existFile.storage.bucket) {
        this.deleteS3FileFromBucket({
          bucket: existFile.storage.bucket,
          key: existFile.filePath,
        })
      }
    }

    const ret = await this.model.upsert({
      where: {
        originalName_groupId: {
          groupId: data.groupId,
          originalName: data.originalName,
        },
      },
      create: {
        ...data,
        fileStorageId: activeStorage.id,
      },
      update: {
        ...data,
        fileStorageId: activeStorage.id,
      },
    })

    return ret
  }

  async handleS3Webhook(body: S3WebhookBodyDto) {
    try {
      const s3 = body?.Records?.[0]?.s3
      const s3Object = s3?.object
      const userMetadata = s3Object?.userMetadata

      const EventName = body?.EventName
      const Key = body?.Key
      const contentType = s3Object?.contentType
      const size = s3Object?.size
      const channelStr = userMetadata?.['X-Amz-Meta-Channel']
      const groupId = userMetadata?.['X-Amz-Meta-Groupid']
      const uploaderId = userMetadata?.['X-Amz-Meta-Uploaderid']

      if (!channelStr || !groupId || !uploaderId) {
        //  The request is not coming from a normal presigned URL, like the console..
        // TODO
        // await this.checkS3File(s3?.bucket?.name, s3Object?.key)
        // return logger.warn('Unhandled s3 notification: ')
        return
      }

      const fileName = basename(Key)

      const data = {
        fileName,
        groupId,
        uploaderId,
        channel: Number(channelStr),
        fileExt: extname(fileName),
        filePath: Key,
        fileSize: size,
        mime: contentType,
        order: 10,
        originalName: fileName,
      }

      switch (EventName) {
        case S3EventsEnum['s3:ObjectCreated:Post']:
          return await this.upsertFileRecord(data)
        case S3EventsEnum['s3:ObjectRemoved:Delete']:
          return await this.temporaryDeleteS3FileFromDB({
            groupId: data.groupId,
            originalName: data.originalName,
          })
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
