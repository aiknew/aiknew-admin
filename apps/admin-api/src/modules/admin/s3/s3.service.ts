import {
  FileStatus,
  Prisma,
  PrismaService,
  StorageType,
  UploadFileChannel,
} from '@aiknew/shared-admin-db'
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
import { logger } from '@aiknew/shared-api-logger'

@Injectable()
export class S3Service {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileStorageService: FileStorageService,
    private readonly configService: ConfigService,
  ) { }

  get model(): PrismaService['uploadFile'] {
    return this.prisma.uploadFile
  }

  get fileStorageModel() {
    return this.prisma.fileStorage
  }

  async getS3Client() {
    const storage = await this.fileStorageService.getFirstStorage()
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
    uploadChannel: UploadFileChannel = 'ADMIN',
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
      Key: key.slice(bucket.length + 1),
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
    groupId: string | null
    originalName: string
    fileStorageId: string
  }) {
    const { groupId, originalName, fileStorageId } = data
    try {
      const file = await this.model.findFirstOrThrow({
        where: {
          groupId,
          originalName,
          fileStorageId
        }
      })

      await this.model.update({
        where: {
          id: file.id
        },

        data: {
          deletedAt: new Date(),
        },
      })

    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          // file record not found
          return
        }
      }
    }
  }

  async deleteS3File(data: {
    groupId: string | null
    originalName: string
    bucket: string
    key: string
    fileStorageId: string
  }) {
    const { bucket, key, groupId, originalName, fileStorageId } = data
    return Promise.allSettled([
      this.temporaryDeleteS3FileFromDB({
        groupId,
        originalName,
        fileStorageId,
      }),
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

  async upsertFileRecord(data: UploadS3FileDto, fileStorageId: string) {
    try {
      return await this.model.upsert({
        where: {
          originalName_groupId_fileStorageId: {
            groupId: data.groupId,
            originalName: data.originalName,
            fileStorageId,
          },
        },
        create: {
          ...data,
          fileStorageId,
        },
        update: {
          ...data,
          deletedAt: null,
          fileStorageId,
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          logger.error(
            'Received a callback request related to creating a file from S3, but the relevant file storage engine id does not exist: ',
            String(err),
          )
        }
      }

      throw err
    }
  }

  isUploadFileChannel(str: string): str is UploadFileChannel {
    return Object.getOwnPropertyNames(UploadFileChannel).includes(str)
  }

  async findFileStorageId(endpoint: string, bucket: string) {
    return this.fileStorageModel.findFirst({
      where: {
        endpoint,
        bucket,
      },
    })
  }

  async handleS3Webhook(body: S3WebhookBodyDto) {
    try {
      const fileStorageId = body.storageId
      const s3 = body?.Records?.[0]?.s3
      const s3Object = s3?.object
      const userMetadata = s3Object?.userMetadata
      const EventName = body?.EventName
      const Key = body?.Key
      const contentType = s3Object?.contentType
      const size = s3Object?.size
      let channelStr = userMetadata?.['X-Amz-Meta-Channel']
      let groupId = userMetadata?.['X-Amz-Meta-Groupid']
      let uploaderId = userMetadata?.['X-Amz-Meta-Uploaderid']

      if (!channelStr && !groupId && !uploaderId) {
        // its not upload from presigned url
        return
      }

      if (!this.isUploadFileChannel(channelStr)) {
        return
      }

      const fileName = basename(Key)

      const data = {
        fileName,
        groupId,
        uploaderId,
        channel: channelStr,
        fileExt: extname(fileName),
        filePath: Key,
        fileSize: size,
        mime: contentType,
        order: 10,
        status: FileStatus.NORMAL,
        originalName: fileName,
      }

      if (EventName.startsWith(S3EventsEnum['s3:ObjectCreated'])) {
        return await this.upsertFileRecord(data, fileStorageId)
      }

      if (EventName.startsWith(S3EventsEnum['s3:ObjectRemoved'])) {
        return await this.temporaryDeleteS3FileFromDB({
          groupId: data.groupId,
          originalName: data.originalName,
          fileStorageId,
        })
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
