import { Injectable } from '@nestjs/common'
import { CreateAuthRouteDto } from './dto/create-auth-route.dto'
import { UpdateAuthRouteDto } from './dto/update-auth-route.dto'
import {
  AppBadRequestException,
  AppConflictException,
} from '@aiknew/shared-api-exceptions'
import {
  Prisma,
  PrismaService,
  getAdminRouteAncestors,
} from '@aiknew/shared-admin-db'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { AuthUserService } from '../auth-user/auth-user.service'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import { AuthRouteTranslationDto } from './dto/auth-route-translation.dto'
import { AuthRouteAncestorsDto } from './dto/auth-route-ancestors.dto'

@Injectable()
export class AuthRouteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly adminUserService: AuthUserService,
  ) {}

  get model() {
    return this.prisma.adminRoute
  }

  get translationModel() {
    return this.prisma.adminRouteTranslation
  }

  get apiRelModel() {
    return this.prisma.adminRouteApi
  }

  async pagination(paginationDto: PaginationDto) {
    const ret = await this.model.paginate(paginationDto, {
      where: {
        parentId: '0',
      },
      include: {
        apis: {
          select: {
            apiId: true,
          },
        },
        translations: {
          select: {
            routeName: true,
            langKey: true,
          },
        },
      },
    })

    return {
      ...ret,
      list: ret.list.map((route) => ({
        ...route,
        apis: route.apis.map((item) => item.apiId),
      })),
    }
  }

  async getChildren(id: string) {
    const ret = await this.model.findMany({
      where: {
        parentId: id,
      },

      include: {
        apis: {
          select: {
            apiId: true,
          },
        },
        translations: {
          select: {
            routeName: true,
            langKey: true,
          },
        },
      },
    })

    return ret.map((route) => ({
      ...route,
      apis: route.apis.map((item) => item.apiId),
    }))
  }

  async findAncestors(id: string | string[]) {
    const routeList = await this.prisma.$queryRawTyped(
      getAdminRouteAncestors([id].flat()),
    )

    const res: AuthRouteAncestorsDto['list'] = []
    const idPathMap = new Map<string, string[]>()

    for (const route of routeList) {
      if (route.parentId === '0' && route.idPath) {
        const arr = route.idPath.split('-')
        const targetId = arr[arr.length - 1]
        if (!idPathMap.has(targetId)) {
          idPathMap.set(targetId, arr)
        }
      }

      let target: AuthRouteAncestorsDto['list'][number] | undefined = res.find(
        (item) => item.id === route.id,
      )

      const translation: AuthRouteTranslationDto = {
        langKey: route.langKey,
        routeName: route.routeName,
      }

      if (target) {
        target.translations
          ? target.translations.push(translation)
          : (target.translations = [translation])
      } else {
        if (
          typeof route.id === 'string' &&
          typeof route.component === 'string' &&
          typeof route.hidden === 'boolean' &&
          typeof route.icon === 'string' &&
          typeof route.key === 'string' &&
          typeof route.status === 'boolean' &&
          typeof route.type === 'string' &&
          typeof route.parentId === 'string' &&
          typeof route.path === 'string' &&
          typeof route.redirect === 'string'
        ) {
          target = {
            id: route.id,
            icon: route.icon,
            redirect: route.redirect,
            key: route.key,
            hidden: route.hidden,
            status: route.status,
            parentId: route.parentId,
            path: route.path,
            type: route.type,
            component: route.component,
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

  findChild(parentId: string) {
    return this.model.findFirst({
      where: {
        parentId,
      },
    })
  }

  constructRelatedApis(idArr?: string[]) {
    if (!idArr) return
    return idArr.map((id) => ({
      api: {
        connect: {
          id,
        },
      },
    }))
  }

  async getAll() {
    const routes = await this.model.findMany({
      include: {
        translations: true,
        apis: {
          select: {
            apiId: true,
          },
        },
      },
    })
    return routes.map((route) => ({
      ...route,
      apis: route.apis.map((item) => item.apiId),
    }))
  }

  async createOne(data: CreateAuthRouteDto) {
    const { apis, translations, ...route } = data
    try {
      await this.model.create({
        data: {
          ...route,
          translations: {
            create: translations,
          },
          apis: {
            create: this.constructRelatedApis(apis),
          },
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          const cause = err.meta?.cause
          if (typeof cause === 'string') {
            if (cause.includes('AdminApi')) {
              throw new AppBadRequestException(
                this.i18n.t('admin-route.nonExistenceApis', {
                  lang: I18nContext.current()?.lang,
                }),
              )
            }
          }
        }
      }

      throw err
    }
  }

  async updateOne(id: string, updateAdminRouteDto: UpdateAuthRouteDto) {
    const { apis, translations, ...route } = updateAdminRouteDto
    await this.adminUserService.clearAllUserCache()
    await this.model.update({
      where: { id },
      data: {
        ...route,

        translations: {
          deleteMany: {},
          create: translations,
        },

        apis: {
          deleteMany: {},
          create: this.constructRelatedApis(apis ?? []),
        },
      },
    })
  }

  async deleteOne(id: string) {
    try {
      await this.adminUserService.clearAllUserCache()
      if (await this.findChild(id)) {
        throw new AppConflictException(
          this.i18n.t('admin-route.hasChild', {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      const deleteTranslations = this.translationModel.deleteMany({
        where: {
          routeId: id,
        },
      })

      const deleteRelatedApis = this.apiRelModel.deleteMany({
        where: {
          routeId: id,
        },
      })

      const deleteRoute = this.model.delete({
        where: {
          id,
        },
      })

      await this.prisma.$transaction([
        deleteTranslations,
        deleteRelatedApis,
        deleteRoute,
      ])
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2003':
            throw new AppConflictException(
              this.i18n.t('admin-route.hasRelated', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }
}
