import { Injectable } from '@nestjs/common'
import { CreateAuthRouteDto } from './dto/create-auth-route.dto'
import { UpdateAuthRouteDto } from './dto/update-auth-route.dto'
import { QueryAuthRouteDto } from './dto/query-auth-route.dto'
import {
  AppBadRequestException,
  AppConflictException,
} from '@aiknew/shared-api-exceptions'
import {
  Prisma,
  PrismaService,
} from '@aiknew/shared-admin-db'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { AdminUserService } from '../admin-user/admin-user.service'

@Injectable()
export class AuthRouteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly authUserService: AdminUserService,
  ) { }

  get model(): PrismaService['adminRoute'] {
    return this.prisma.adminRoute
  }

  get translationModel(): PrismaService['adminRouteTranslation'] {
    return this.prisma.adminRouteTranslation
  }

  get permissionRelModel() {
    return this.prisma.adminRoutePermission
  }

  findChild(parentId: string) {
    return this.model.findFirst({
      where: {
        parentId,
      },
    })
  }

  constructRelatedPermissions(idArr?: string[]) {
    if (!idArr) return
    return idArr.map((id) => ({
      permission: {
        connect: {
          id,
        },
      },
    }))
  }

  async getAll(query?: QueryAuthRouteDto) {
    const where: Record<string, unknown> = {}
    if (query?.name) {
      where.translations = {
        some: {
          routeName: {
            contains: query.name,
            mode: 'insensitive'
          }
        }
      }
    }
    if (query?.type) {
      where.type = query.type
    }
    const routes = await this.model.findMany({
      where,
      include: {
        translations: true,
        permissions: {
          select: {
            permissionId: true,
          },
        },
      },
      orderBy: [
        {
          order: 'asc'
        },
        {
          createdAt: 'desc'
        }
      ]
    })
    return routes.map((route) => ({
      ...route,
      permissions: route.permissions.map((item) => item.permissionId),
    }))
  }

  async createOne(data: CreateAuthRouteDto) {
    const { permissions, translations, ...route } = data
    try {
      await this.model.create({
        data: {
          ...route,
          translations: {
            create: translations,
          },
          permissions: {
            create: this.constructRelatedPermissions(permissions),
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
    const { permissions: apis, translations, ...route } = updateAdminRouteDto
    await this.authUserService.clearAllUserCache()
    await this.model.update({
      where: { id },
      data: {
        ...route,

        translations: {
          deleteMany: {},
          create: translations,
        },

        permissions: {
          deleteMany: {},
          create: this.constructRelatedPermissions(apis ?? []),
        },
      },
    })
  }

  async deleteOne(id: string) {
    try {
      await this.authUserService.clearAllUserCache()
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

      const deleteRelatedApis = this.permissionRelModel.deleteMany({
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
