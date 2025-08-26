import { Injectable } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { Prisma, PrismaService } from '@aiknew/shared-admin-db'
import { rm } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { ConfigService } from '@nestjs/config'
import { QueryUploadFileDto } from './dto/query-upload-file.dto'
import { UploadFileGroupService } from '../upload-file-group/upload-file-group.service'
import { UpdateUploadFileDto } from './dto/update-upload-file.dto'
import {
  AppConflictException,
  AppNotFoundException,
} from '@aiknew/shared-api-exceptions'
import { FileStorageService } from '../file-storage/file-storage.service'
import { S3Service } from '../s3/s3.service'

@Injectable()
export class FileService {
  private static readonly modelName = 'uploadFile'

  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadFileGroupService: UploadFileGroupService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly fileStorageService: FileStorageService,
    private readonly s3Service: S3Service,
  ) {}

  get model(): PrismaService['uploadFile'] {
    return this.prisma[FileService.modelName]
  }

  get fileStorageModel(): PrismaService['fileStorage'] {
    return this.prisma.fileStorage
  }

  async getFilesAndGroups(queryUploadFileDto: QueryUploadFileDto) {
    try {
      const {
        parentId,
        pageSize,
        currentPage: current,
        keyword,
      } = queryUploadFileDto
      const fileWhereInput = {
        groupId: parentId,
        originalName: { contains: keyword },
        deletedAt: null,
      }
      const groupWhereInput: Prisma.UploadFileGroupWhereInput = {
        parentId,
        groupName: { contains: keyword },
      }

      const firstStorage = await this.fileStorageService.getFirstStorage()

      const groupsPaginationData = await this.uploadFileGroupService.pagination(
        { currentPage: current, pageSize },
        groupWhereInput,
      )

      const groupsCount = await this.uploadFileGroupService.getCount({
        where: groupWhereInput,
      })

      const filesCount = await this.getCount({
        where: fileWhereInput,
      })

      const skipFilesNum = (current - 1) * pageSize - groupsCount
      const takeFilesNum = pageSize - groupsPaginationData.list.length
      const fileList = await this.model.findMany({
        take: takeFilesNum,
        skip: skipFilesNum < 0 ? 0 : skipFilesNum,
        where: fileWhereInput,
        include: {
          uploader: {
            select: { userName: true },
          },
          storage: {
            select: {
              hostname: true,
              name: true,
              type: true,
              status: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      })

      return {
        total: groupsCount + filesCount,
        current,
        pageSize,
        groupList: groupsPaginationData.list,
        fileList,
        storage: {
          id: firstStorage.id,
          name: firstStorage.name,
          status: firstStorage.status,
          hostname: firstStorage.hostname,
          bucket: firstStorage.bucket,
          type: firstStorage.type,
        },
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            throw new AppNotFoundException(
              this.i18n.t('upload-file.fileGroupNotExists', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }

  async getCount(args?: Prisma.UploadFileCountArgs) {
    return this.model.count(args)
  }

  async updateOne(id: string, updateFileDto: UpdateUploadFileDto) {
    try {
      await this.model.update({
        where: {
          id,
        },

        data: updateFileDto,
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            throw new AppConflictException(this.i18n.t('upload-file.sameGroup'))
        }
      }
      throw err
    }
  }

  async createOne(
    fileData: Omit<Prisma.UploadFileCreateArgs['data'], 'fileStorageId'>,
  ) {
    try {
      const storage = await this.fileStorageService.getFirstStorage()
      if (storage.type === 'LOCAL') {
        const data = {
          ...fileData,
          fileStorageId: storage.id,
        } as Prisma.UploadFileCreateArgs['data']

        await this.model.create({
          data,
        })
      }
    } catch (err) {
      // delete the file asset
      await rm(
        join(
          this.configService.get<string>('common.publicFolder') ?? '',
          fileData.filePath,
        ),
        { force: true },
      )

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            throw new AppConflictException(this.i18n.t('upload-file.sameGroup'))
        }
      }

      throw err
    }
  }

  async deleteOne(id: string) {
    try {
      const file = await this.model.findUniqueOrThrow({
        where: { id },
      })

      const fileStorage = await this.fileStorageModel.findUniqueOrThrow({
        where: {
          id: file.fileStorageId,
        },
      })

      if (fileStorage.type === 'S3') {
        const bucket = fileStorage.bucket
        if (bucket) {
          await this.s3Service.deleteS3File({
            groupId: file.groupId,
            originalName: file.originalName,
            key: file.filePath,
            fileStorageId: file.fileStorageId,
            bucket,
          })
        }
      } else if (fileStorage.type === 'LOCAL') {
        await this.prisma.$transaction(async (tx) => {
          // delete the file record in database
          const deletedFile = await tx[FileService.modelName].delete({
            where: {
              id,
            },
          })

          // delete the file
          await rm(
            join(
              this.configService.get<string>('common.publicFolder') ?? '',
              deletedFile.filePath,
            ),
            {
              force: true,
            },
          )
        })
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            throw new AppNotFoundException(
              this.i18n.t('upload-file.inexistentFile'),
            )
        }

        if (err.code === 'ENOENT') {
          // if file doesn't exists, just delete the record in database
          await this.model.delete({
            where: {
              id,
            },
          })
        }
      }

      throw err
    }
  }
}
