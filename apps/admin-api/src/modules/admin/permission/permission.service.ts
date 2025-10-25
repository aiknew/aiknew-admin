import { Injectable } from "@nestjs/common"
import { CreatePermissionDto } from "./dto/create-permission.dto"
import {
  AdminPermissionSource,
  Prisma,
  PrismaService,
} from "@aiknew/shared-admin-db"
import { I18nContext, I18nService } from "nestjs-i18n"
import {
  AppBadRequestException,
  AppConflictException,
} from "@aiknew/shared-api-exceptions"
import { UpdatePermissionDto } from "./dto/update-permission.dto"
import { AdminUserService } from "../admin-user/admin-user.service"
import { QueryPermissionDto } from "./dto/query-permission.dto"

@Injectable()
export class PermissionService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly authUserService: AdminUserService,
  ) {}

  get model() {
    return this.prisma.adminPermission
  }

  get permissionGroupModel() {
    return this.prisma.adminPermissionGroup
  }

  get translationModel() {
    return this.prisma.adminPermissionTranslation
  }

  async getAll(conditions: QueryPermissionDto) {
    return this.model.findMany({
      where: conditions,
      include: {
        translations: true,
      },
    })
  }

  async createOne(data: CreatePermissionDto) {
    const { translations, ...permission } = data
    try {
      await this.model.create({
        data: {
          ...permission,
          source: AdminPermissionSource.EXTERNAL,
          translations: {
            create: translations,
          },
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case "P2002":
            throw new AppConflictException(
              this.i18n.t("permission.alreadyExists", {
                lang: I18nContext?.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }

  async isBuiltIn(id: string) {
    const item = await this.model.findUnique({ where: { id } })
    if (!item) {
      throw new AppBadRequestException(this.i18n.t("permission.nonExistsAPI"))
    }

    return item.source === "BUILT_IN"
  }

  async updateOne(id: string, data: UpdatePermissionDto) {
    if (await this.isBuiltIn(id)) {
      throw new AppBadRequestException(
        this.i18n.t("permission.cannotModifyBuiltIn", {
          lang: I18nContext.current()?.lang,
        }),
      )
    }

    this.authUserService.clearAllUserCache().catch((err) => {
      throw err
    })

    const { translations, ...permission } = data
    await this.model.update({
      where: {
        id,
      },
      data: {
        ...permission,
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
          this.i18n.t("permission.cannotDelBuiltIn", {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      this.authUserService.clearAllUserCache().catch((err) => {
        throw err
      })

      const deleteTranslations = this.translationModel.deleteMany({
        where: {
          permissionId: id,
        },
      })

      const deletePermission = this.model.delete({
        where: {
          id,
        },
      })

      await this.prisma.$transaction([deleteTranslations, deletePermission])
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case "P2003":
            throw new AppConflictException(
              this.i18n.t("permission.haveRelated", {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }
}
