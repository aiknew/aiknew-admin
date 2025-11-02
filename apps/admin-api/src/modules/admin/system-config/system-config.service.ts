import { Injectable } from "@nestjs/common"
import { Prisma, PrismaService } from "@aiknew/shared-admin-db"
import {
  CreateSystemConfigDto,
  UpdateSystemConfigDto,
  QuerySystemConfigDto,
} from "./dto"
import { AppBadRequestException } from "@aiknew/shared-api-exceptions"
import { I18nContext, I18nService } from "nestjs-i18n"
import { LoginVerificationTypeKey } from "@aiknew/shared-constants"

@Injectable()
export class SystemConfigService {
  publicConfigKeys: string[] = [LoginVerificationTypeKey]

  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  get model() {
    return this.prisma.systemConfig
  }

  get translationModel() {
    return this.prisma.systemConfigTranslation
  }

  async getPublicConfig(key: string) {
    if (!this.publicConfigKeys.includes(key)) {
      throw new AppBadRequestException("无权限获取该配置项")
    }

    const config: { value: string | null } = { value: null }
    const ret = await this.getConfigByKey(key)
    config.value = ret?.value ?? null
    return config
  }

  async getConfigByKey(key: string) {
    return await this.model.findUnique({
      where: { key },
      select: {
        value: true,
      },
    })
  }

  async pagination(query: QuerySystemConfigDto) {
    const { currentPage, pageSize, key, name, remark, value } = query

    return await this.model.paginate(
      { currentPage, pageSize },
      {
        where: {
          key: {
            contains: key,
          },
          value: {
            contains: value,
          },
          translations: {
            some: {
              name: {
                contains: name,
                mode: "insensitive",
              },
              remark: {
                contains: remark,
                mode: "insensitive",
              },
            },
          },
        },
        include: {
          translations: true,
        },
      },
    )
  }

  async createOne(data: CreateSystemConfigDto) {
    try {
      const { translations, ...rest } = data
      return await this.model.create({
        data: {
          ...rest,
          builtIn: false,
          translations: {
            create: translations,
          },
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new AppBadRequestException(
            this.i18n.t("config.keyExists", {
              lang: I18nContext?.current()?.lang,
            }),
          )
        }
      }

      throw err
    }
  }

  async updateOne(id: string, data: UpdateSystemConfigDto) {
    const { translations, key, value } = data
    let builtIn = false

    const config = await this.model.findUnique({
      where: { id },
    })

    if (config?.builtIn) {
      builtIn = true

      if (config.key !== key) {
        throw new AppBadRequestException(
          this.i18n.t("config.cannotModifyBuiltIn", {
            lang: I18nContext?.current()?.lang,
          }),
        )
      }
    }

    return this.model.update({
      where: {
        id,
      },
      data: {
        key,
        value,
        builtIn,
        translations: translations && {
          deleteMany: {},
          create: translations,
        },
      },
    })
  }

  async deleteOne(id: string) {
    const item = await this.model.findUnique({
      where: { id },
    })

    if (item?.builtIn) {
      throw new AppBadRequestException(
        this.i18n.t("config.cannotDeleteSystem", {
          lang: I18nContext?.current()?.lang,
        }),
      )
    }

    const deleteTranslations = this.translationModel.deleteMany({
      where: {
        configId: id,
      },
    })

    const deleteConfig = this.model.delete({
      where: {
        id,
      },
    })

    await this.prisma.$transaction([deleteTranslations, deleteConfig])
  }
}
