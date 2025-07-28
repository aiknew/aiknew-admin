import { Injectable } from '@nestjs/common'
import {
  Prisma,
  ExtendedPrismaTransactionClient,
  PrismaService,
} from '@aiknew/shared-admin-db'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import { CreateUploadFileGroupDto } from './dto/create-upload-file-group.dto'
import {
  AppBadRequestException,
  AppConflictException,
} from '@aiknew/shared-api-exceptions'
import { UpdateUploadFileGroupDto } from './dto/update-upload-file-group.dto'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class UploadFileGroupService {
  private static readonly modelName = 'uploadFileGroup'
  private static readonly fileModelName = 'uploadFile'
  private static readonly fileGroupPathModelName = 'uploadFileGroupPath'

  // Maximum groups in the same level
  protected maxGroups = 1000
  // Maximum group depth level
  protected maxLevel = 100
  // The cache key of all file groups data
  protected groupsCacheKey = 'all-file-groups'
  // The top level group
  protected topLevelGroup = {
    id: '0',
    groupName: 'Top',
    parentId: '',
    order: 0,
    children: [],
  }

  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  get model() {
    return this.prisma[UploadFileGroupService.modelName]
  }

  async findChildren(parentId: string) {
    return await this.model.findMany({
      where: {
        parentId,
      },
    })
  }

  async pagination(
    paginationDto: PaginationDto,
    where: Prisma.UploadFileGroupWhereInput = {},
  ) {
    return this.model.paginate(paginationDto, {
      where,
      orderBy: [
        {
          order: 'asc',
        },
      ],
      include: {
        ancestors: {
          include: { ancestor: { select: { groupName: true } } },
          orderBy: {
            depth: 'desc',
          },
        },
      },
    })
  }

  async getCount(args?: Prisma.UploadFileGroupCountArgs) {
    return await this.model.count(args)
  }

  async deletePaths(descendantId: string, tx: ExtendedPrismaTransactionClient) {
    const ret = await tx[
      UploadFileGroupService.fileGroupPathModelName
    ].deleteMany({
      where: {
        descendantId,
      },
    })

    return ret
  }

  async createPaths(
    group: { id: string; parentId: string },
    tx: ExtendedPrismaTransactionClient,
  ) {
    if (group.parentId !== '0') {
      const ancestors = await tx[
        UploadFileGroupService.fileGroupPathModelName
      ].findMany({
        where: {
          descendantId: group.parentId,
        },
      })

      const paths = [
        {
          ancestorId: group.parentId,
          descendantId: group.id,
          depth: 1,
        },
        ...ancestors.map((item) => {
          return {
            ancestorId: item.ancestorId,
            descendantId: group.id,
            depth: item.depth + 1,
          }
        }),
      ]

      return await tx[UploadFileGroupService.fileGroupPathModelName].createMany(
        {
          data: paths,
        },
      )
    }
  }

  async createOne(data: CreateUploadFileGroupDto) {
    try {
      await this.prisma.$transaction(async (tx) => {
        // await this.clearAllGroupsCache()
        const group = await tx[UploadFileGroupService.modelName].create({
          data,
        })

        await this.createPaths(group, tx)
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            throw new AppConflictException(
              this.i18n.t('upload-file-group.groupNameExists', {
                lang: I18nContext.current()?.lang,
              }),
            )
          case 'P2003':
            throw new AppBadRequestException(
              this.i18n.t('upload-file-group.invalidParentGroup', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }

  async updateOne(id: string, updateGroupDto: UpdateUploadFileGroupDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // await this.clearAllGroupsCache()
        const group = await tx[
          UploadFileGroupService.modelName
        ].findUniqueOrThrow({
          where: { id },
        })

        if (
          updateGroupDto.parentId &&
          group.parentId !== updateGroupDto.parentId
        ) {
          // Moved
          await this.deletePaths(id, tx)
          await this.createPaths({ id, parentId: updateGroupDto.parentId }, tx)
        }

        return await tx[UploadFileGroupService.modelName].update({
          where: {
            id,
          },

          data: updateGroupDto,
        })
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            throw new AppConflictException(
              this.i18n.t('upload-file-group.groupNameExists', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }

  async deleteOne(groupId: string) {
    await this.prisma.$transaction(async (tx) => {
      // await this.clearAllGroupsCache()
      const childCount = await this.hasChildGroup(groupId, tx)
      const fileCount = await this.hasFile(groupId, tx)

      if (childCount > 0 || fileCount > 0) {
        throw new AppBadRequestException(
          this.i18n.t('upload-file-group.groupIsUsing', {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      await this.deletePaths(groupId, tx)
      await tx[UploadFileGroupService.modelName].delete({
        where: {
          id: groupId,
        },
      })
    })
  }

  async hasChildGroup(groupId: string, tx: ExtendedPrismaTransactionClient) {
    return await tx[UploadFileGroupService.modelName].count({
      where: {
        parentId: groupId,
      },
    })
  }

  async hasFile(groupId: string, tx: ExtendedPrismaTransactionClient) {
    return await tx[UploadFileGroupService.fileModelName].count({
      where: {
        groupId,
      },
    })
  }
}
