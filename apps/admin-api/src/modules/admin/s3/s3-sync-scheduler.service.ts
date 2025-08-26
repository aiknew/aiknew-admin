import { FileStatus, PrismaService, UploadFile } from '@aiknew/shared-admin-db'
import { HeadObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { Cron, Interval } from '@nestjs/schedule'

@Injectable()
export class S3SyncSchedulerService {
  private static fileCursor: undefined | string
  constructor(private readonly prisma: PrismaService) {}

  get fileModel(): PrismaService['uploadFile'] {
    return this.prisma.uploadFile
  }

  get fileStorageModel(): PrismaService['fileStorage'] {
    return this.prisma.fileStorage
  }

  async getUploadFiles(amount: number = 100) {
    let files: UploadFile[] = []
    if (!S3SyncSchedulerService.fileCursor) {
      files = await this.fileModel.findMany({
        take: amount,
        orderBy: {
          id: 'asc',
        },
      })
    } else {
      files = await this.fileModel.findMany({
        take: amount,
        skip: 1,
        cursor: {
          id: S3SyncSchedulerService.fileCursor,
        },
        orderBy: {
          id: 'asc',
        },
      })
    }

    S3SyncSchedulerService.fileCursor = files.length
      ? files[files.length - 1].id
      : undefined

    return files
  }

  @Cron('45 * * * * *')
  async handleCron() {
    const ret = await this.getUploadFiles()
    ret.forEach(async (file) => {
      const storage = await this.fileStorageModel.findUnique({
        where: {
          id: file.fileStorageId,
        },
      })

      if (
        storage &&
        storage.type === 'S3' &&
        storage.endpoint &&
        storage.accessKey &&
        storage.secretKey &&
        storage.bucket
      ) {
        const client = new S3Client({
          region: 'us-east-1',
          endpoint: storage.endpoint,
          credentials: {
            accessKeyId: storage.accessKey,
            secretAccessKey: storage.secretKey,
          },
        })
        const command = new HeadObjectCommand({
          Bucket: storage.bucket,
          Key: file.originalName,
        })
        try {
          await client.send(command)

          await this.fileModel.update({
            where: {
              id: file.id,
            },
            data: {
              status: FileStatus.NORMAL,
            },
          })
        } catch (err) {
          if (err.name === 'NotFound') {
            await this.fileModel.update({
              where: {
                id: file.id,
              },
              data: {
                status: FileStatus.MISSING,
              },
            })
          }
        }
      } else {
        // local file storage
      }
    })
  }
}
