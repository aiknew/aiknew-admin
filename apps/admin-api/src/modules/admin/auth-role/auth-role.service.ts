import { Injectable } from '@nestjs/common'
import { CreateAuthRoleDto } from './dto/create-auth-role.dto'
import { UpdateAuthRoleDto } from './dto/update-auth-role.dto'
import { Prisma, PrismaService } from '@aiknew/shared-admin-db'
import { AppConflictException } from '@aiknew/shared-api-exceptions'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import { AdminUserService } from '../admin-user/admin-user.service'

@Injectable()
export class AuthRoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly adminUserService: AdminUserService,
  ) {}

  get model() {
    return this.prisma.adminRole
  }

  get translationModel() {
    return this.prisma.adminRoleTranslation
  }

  get routeRelModel() {
    return this.prisma.adminRoleRoute
  }

  constructRelatedRoutes(idArr: string[]) {
    return idArr.map((id) => ({
      route: {
        connect: {
          id,
        },
      },
    }))
  }

  async getAll() {
    return await this.model.findMany({
      include: {
        translations: true,
      },
    })
  }

  async pagination(paginationDto: PaginationDto) {
    const roles = await this.model.paginate(paginationDto, {
      include: {
        translations: true,
        routes: true,
      },
    })

    return {
      ...roles,
      list: roles.list.map((role) => {
        return {
          ...role,
          routes: role.routes.map((item) => item.routeId),
        }
      }),
    }
  }

  async createOne(data: CreateAuthRoleDto) {
    const { routes, translations, ...role } = data
    await this.model.create({
      data: {
        ...role,
        routes: {
          create: this.constructRelatedRoutes(routes),
        },
        translations: {
          create: translations,
        },
      },
    })
  }

  async updateOne(id: string, data: UpdateAuthRoleDto) {
    await this.adminUserService.clearAllUserCache()
    const { routes, translations, ...role } = data
    await this.model.update({
      where: { id },
      data: {
        ...role,

        translations: {
          deleteMany: {},
          create: translations,
        },

        routes: {
          deleteMany: {},
          create: this.constructRelatedRoutes(routes ?? []),
        },
      },
    })
  }

  async deleteOne(id: string) {
    try {
      await this.adminUserService.clearAllUserCache()
      const deleteRelatedRoutes = this.routeRelModel.deleteMany({
        where: {
          roleId: id,
        },
      })

      const deleteTranslations = this.translationModel.deleteMany({
        where: {
          adminRoleId: id,
        },
      })

      const deleteRole = this.model.delete({
        where: { id },
      })

      await this.prisma.$transaction([
        deleteRelatedRoutes,
        deleteTranslations,
        deleteRole,
      ])
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2003':
            throw new AppConflictException(
              this.i18n.t('admin-role.hasRelated', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }
}
