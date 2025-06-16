import { Injectable } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { Prisma, PrismaService } from '@aiknew/shared-api-prisma'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { ConfigService } from '@nestjs/config'
import { QueryUploadFileDto } from './dto/query-upload-file.dto'
import { UploadFileGroupService } from '../upload-file-group/upload-file-group.service'
import { UpdateUploadFileDto } from './dto/update-upload-file.dto'
import {
  AppConflictException,
  AppNotFoundException,
} from '@aiknew/shared-api-exceptions'

@Injectable()
export class FileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadFileGroupService: UploadFileGroupService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

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
      }
      const groupWhereInput: Prisma.UploadFileGroupWhereInput = {
        parentId,
        groupName: { contains: keyword },
      }

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
      const fileList = await this.prisma.uploadFile.findMany({
        take: takeFilesNum,
        skip: skipFilesNum < 0 ? 0 : skipFilesNum,
        where: fileWhereInput,
        include: {
          uploader: {
            select: { userName: true },
          },
        },
      })

      return {
        total: groupsCount + filesCount,
        current,
        pageSize,
        groupList: groupsPaginationData.list,
        fileList,
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
    return this.prisma.uploadFile.count(args)
  }

  async paginate(
    current: number,
    pageSize: number,
    where: Prisma.UploadFileWhereInput = {},
  ) {
    if (current <= 0) {
      return { total: 0, list: [] }
    }

    return await this.prisma.uploadFile.paginate(
      { currentPage: current, pageSize },
      {
        where,
      },
    )
  }

  async updateOne(id: string, updateFileDto: UpdateUploadFileDto) {
    try {
      await this.prisma.uploadFile.update({
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

  async createOne(fileData: Prisma.UploadFileCreateArgs['data']) {
    try {
      await this.prisma.uploadFile.create({
        data: fileData,
      })
    } catch (err) {
      // delete the file asset
      await fs.rm(
        path.join(
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
      await this.prisma.$transaction(async (prisma) => {
        // delete the file record in database
        const deletedFile = await prisma.uploadFile.delete({
          where: {
            id,
          },
        })

        // delete the file
        await fs.rm(
          path.join(
            this.configService.get<string>('common.publicFolder') ?? '',
            deletedFile.filePath,
          ),
          {
            force: true,
          },
        )
      })
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
          await this.prisma.uploadFile.delete({
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
