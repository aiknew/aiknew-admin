import { Injectable } from '@nestjs/common'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import { CreateApiDto } from './dto/create-api.dto'
import {
  Prisma,
  PrismaService,
  getAdminApiAncestors,
} from '@aiknew/shared-admin-db'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { AppConflictException } from '@aiknew/shared-api-exceptions'
import { UpdateApiDto } from './dto/update-api.dto'
import { AdminUserService } from '../admin-user/admin-user.service'
import { type AdminApiTranslationDto } from './dto/admin-api-translation.dto'
import { type AdminApiTreeListDto } from './dto/admin-api-tree-list.dto'
import { type AdminApiDto } from './dto/admin-api.dto'
import { isDate } from 'lodash-es'

@Injectable()
export class AdminApiService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly adminUserService: AdminUserService,
  ) {}

  async pagination(paginationDto: PaginationDto) {
    return await this.prisma.adminApi.paginate(paginationDto, {
      where: {
        parentId: '0',
      },
      include: {
        translations: {
          select: {
            apiName: true,
            langKey: true,
          },
        },
      },
    })
  }

  async findAncestors(id: string | string[]) {
    const apiList = await this.prisma.$queryRawTyped(
      getAdminApiAncestors([id].flat()),
    )
    const res: AdminApiDto[] = []
    const idPathMap = new Map<string, string[]>()

    for (const api of apiList) {
      if (api.parentId === '0' && api.idPath) {
        const arr = api.idPath.split('-')
        const targetId = arr[arr.length - 1]
        if (!idPathMap.has(targetId)) {
          idPathMap.set(targetId, arr)
        }
      }

      let target: AdminApiDto | undefined = res.find(
        (item) => item.id === api.id,
      )

      const translation: AdminApiTranslationDto = {
        langKey: api.langKey,
        apiName: api.apiName,
      }

      if (target) {
        target.translations
          ? target.translations.push(translation)
          : (target.translations = [translation])
      } else {
        if (
          typeof api.id === 'string' &&
          typeof api.method === 'string' &&
          typeof api.parentId === 'string' &&
          typeof api.url === 'string' &&
          typeof api.order === 'number' &&
          isDate(api.createdAt) &&
          isDate(api.updatedAt)
        ) {
          target = {
            id: api.id,
            method: api.method,
            parentId: api.parentId,
            url: api.url,
            order: api.order,
            createdAt: api.createdAt,
            updatedAt: api.updatedAt,
            translations: [translation],
          }

          res.push(target)
        }
      }
    }

    return {
      idPath: Object.fromEntries(idPathMap),
      list: res,
    }
  }

  async getChildren(id: string) {
    return await this.prisma.adminApi.findMany({
      where: {
        parentId: id,
      },

      include: {
        translations: {
          select: {
            apiName: true,
            langKey: true,
          },
        },
      },
    })
  }

  async createOne(createApiDto: CreateApiDto) {
    const { translations, ...api } = createApiDto
    try {
      await this.prisma.adminApi.create({
        data: {
          ...api,
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
              this.i18n.t('admin-api.alreadyExists', {
                lang: I18nContext?.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }

  async updateOne(id: string, updateApiDto: UpdateApiDto) {
    this.adminUserService.clearAllUserCache().catch((err) => {
      throw err
    })

    const { translations, ...api } = updateApiDto
    await this.prisma.adminApi.update({
      where: {
        id,
      },
      data: {
        ...api,
        translations: {
          deleteMany: {},
          create: translations,
        },
      },
    })
  }

  async findChild(parentId: string) {
    return this.prisma.adminApi.findFirst({
      where: {
        parentId,
      },
    })
  }

  async deleteOne(id: string) {
    try {
      this.adminUserService.clearAllUserCache().catch((err) => {
        throw err
      })

      if (await this.findChild(id)) {
        throw new AppConflictException(
          this.i18n.t('admin-api.haveChild', {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      const deleteTranslations = this.prisma.adminApiTranslation.deleteMany({
        where: {
          apiId: id,
        },
      })

      const deleteApi = this.prisma.adminApi.delete({
        where: {
          id,
        },
      })

      await this.prisma.$transaction([deleteTranslations, deleteApi])
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2003':
            throw new AppConflictException(
              this.i18n.t('admin-api.haveRelated', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }
}
