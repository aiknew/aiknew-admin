import { Injectable } from '@nestjs/common'
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto'
import {
  AdminPermissionSource,
  Prisma,
  PrismaService
} from '@aiknew/shared-admin-db'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { AppBadRequestException, AppConflictException } from '@aiknew/shared-api-exceptions'
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto'

@Injectable()
export class PermissionGroupService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
  ) { }

  get model() {
    return this.prisma.adminPermissionGroup
  }

  get translationModel() {
    return this.prisma.adminPermissionGroupTranslation
  }

  async getAll() {
    return await this.model.findMany({
      include: {
        translations: {
          select: {
            groupName: true,
            langKey: true,
          },
        },
      },
      orderBy: [
        {
          order: 'asc'
        },
        {
          createdAt: 'desc'
        },
      ]
    })
  }

  async createOne(data: CreatePermissionGroupDto) {
    const { translations, ...permissionGroup } = data
    try {
      await this.model.create({
        data: {
          ...permissionGroup,
          translations: {
            create: translations,
          },
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            throw new AppConflictException(
              this.i18n.t('permission-group.alreadyExists', {
                lang: I18nContext?.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }

  async isBuiltIn(id: string) {
    const item = await this.model.findUnique({
      where: { id }
    })

    if (!item) {
      throw new AppBadRequestException(
        this.i18n.t('permission-group.nonExistsGroup',
          {
            lang: I18nContext.current()?.lang
          }
        )
      )
    }

    return item.source === AdminPermissionSource.BUILT_IN

  }

  async updateOne(id: string, data: UpdatePermissionGroupDto) {
    if (await this.isBuiltIn(id)) {
      throw new AppBadRequestException(
        this.i18n.t('permission-group.cannotModifyBuiltIn', {
          lang: I18nContext.current()?.lang
        })
      )
    }

    const { translations, ...permissionGroup } = data
    await this.model.update({
      where: {
        id,
      },
      data: {
        ...permissionGroup,
        translations: {
          deleteMany: {},
          create: translations,
        },
      },
    })
  }

  async deleteOne(id: string) {
    try {

      if (await this.isBuiltIn(id)) {
        throw new AppBadRequestException(
          this.i18n.t('permission-group.cannotDeleteBuiltIn', {
            lang: I18nContext.current()?.lang
          })
        )
      }

      const deleteTranslations = this.translationModel.deleteMany({
        where: {
          groupId: id,
        },
      })

      const deleteGroup = this.model.delete({
        where: {
          id,
        },
      })

      await this.prisma.$transaction([deleteTranslations, deleteGroup])
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2003':
            throw new AppConflictException(
              this.i18n.t('permission-group.haveRelated', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }

}