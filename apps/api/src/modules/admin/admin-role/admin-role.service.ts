import { Injectable } from '@nestjs/common'
import { CreateAdminRoleDto } from './dto/create-admin-role.dto'
import { UpdateAdminRoleDto } from './dto/update-admin-role.dto'
import { Prisma } from '@prisma/client'
import { AppConflictException } from 'src/common/exceptions'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { PaginationDto } from 'src/common/dtos'
import { AdminUserService } from '../admin-user/admin-user.service'
import { PrismaService } from 'src/modules/global/prisma/prisma.service'

@Injectable()
export class AdminRoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly adminUserService: AdminUserService,
  ) {}

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
    return await this.prisma.adminRole.findMany({
      include: {
        translations: true,
      },
    })
  }

  async pagination(paginationDto: PaginationDto) {
    const roles = await this.prisma.adminRole.paginate(paginationDto, {
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

  async createOne(createAdminRoleDto: CreateAdminRoleDto) {
    const { routes, translations, ...role } = createAdminRoleDto
    await this.prisma.adminRole.create({
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

  async updateOne(id: string, updateAdminRoleDto: UpdateAdminRoleDto) {
    await this.adminUserService.clearAllUserCache()
    const { routes, translations, ...role } = updateAdminRoleDto
    await this.prisma.adminRole.update({
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
      const deleteRelatedRoutes = this.prisma.adminRoleRoute.deleteMany({
        where: {
          roleId: id,
        },
      })

      const deleteTranslations = this.prisma.adminRoleTranslation.deleteMany({
        where: {
          adminRoleId: id,
        },
      })

      const deleteRole = this.prisma.adminRole.delete({
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
