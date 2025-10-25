import { Injectable } from "@nestjs/common"
import { Prisma, PrismaService } from "@aiknew/shared-admin-db"
import { CreateConfigDto } from "./dto/create-config.dto"
import { UpdateConfigDto } from "./dto/update-config.dto"
import { QueryConfigDto } from "./dto/query-config.dto"
import { AppBadRequestException } from "@aiknew/shared-api-exceptions"
import { I18nContext, I18nService } from "nestjs-i18n"

@Injectable()
export class ConfigService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  get model() {
    return this.prisma.config
  }

  get translationModel() {
    return this.prisma.configTranslation
  }

  async pagination(query: QueryConfigDto) {
    const { currentPage, pageSize, key, name, remark, value } = query

    return this.model.paginate(
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

  async createOne(data: CreateConfigDto) {
    try {
      const { translations, ...rest } = data
      return await this.model.create({
        data: {
          ...rest,
          system: false,
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

  async updateOne(id: string, data: UpdateConfigDto) {
    const { translations, key, value } = data
    let system = false

    const config = await this.model.findUnique({
      where: { id },
    })

    if (config?.system) {
      system = true

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
        system,
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

    if (item?.system) {
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
