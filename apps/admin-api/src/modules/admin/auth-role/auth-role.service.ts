import { Injectable } from "@nestjs/common"
import { CreateAuthRoleDto } from "./dto/create-auth-role.dto"
import { UpdateAuthRoleDto } from "./dto/update-auth-role.dto"
import { Prisma, PrismaService } from "@aiknew/shared-admin-db"
import { AppConflictException } from "@aiknew/shared-api-exceptions"
import { I18nContext, I18nService } from "nestjs-i18n"
import { QueryAuthRoleDto } from "./dto/query-auth-role.dto"
import { AdminUserService } from "../admin-user/admin-user.service"

@Injectable()
export class AuthRoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly authUserService: AdminUserService,
  ) {}

  get model(): PrismaService["adminRole"] {
    return this.prisma.adminRole
  }

  get translationModel(): PrismaService["adminRoleTranslation"] {
    return this.prisma.adminRoleTranslation
  }

  get routeRelModel(): PrismaService["adminRoleRoute"] {
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

  async pagination(queryDto: QueryAuthRoleDto) {
    const { name, ...paginationDto } = queryDto

    const where: Record<string, unknown> = {}
    if (name) {
      where.translations = {
        some: {
          roleName: {
            contains: name,
            mode: "insensitive",
          },
        },
      }
    }

    const roles = await this.model.paginate(paginationDto, {
      where,
      include: {
        translations: true,
        routes: true,
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
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
    await this.authUserService.clearAllUserCache()
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
      await this.authUserService.clearAllUserCache()
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
          case "P2003":
            throw new AppConflictException(
              this.i18n.t("admin-role.hasRelated", {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }
}
