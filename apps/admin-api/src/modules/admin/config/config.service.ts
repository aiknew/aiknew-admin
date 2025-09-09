import { Injectable } from '@nestjs/common'
import { PrismaService } from '@aiknew/shared-admin-db'
import { CreateConfigDto } from './dto/create-config.dto'
import { UpdateConfigDto } from './dto/update-config.dto'
import { QueryConfigDto } from './dto/query-config.dto'
import { AppBadRequestException } from '@aiknew/shared-api-exceptions'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class ConfigService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) { }

  get model() {
    return this.prisma.config
  }

  get translationModel() {
    return this.prisma.configTranslation
  }

  async pagination(query: QueryConfigDto) {
    return this.model.paginate(query, {
      include: {
        translations: true,
      },
    })
  }

  async createOne(data: CreateConfigDto) {
    const { translations, ...rest } = data
    return this.model.create({
      data: {
        ...rest,
        translations: {
          create: translations,
        },
      },
    })
  }

  async isSystemConfig(id: string) {
    const config = await this.model.findUniqueOrThrow({
      where: { id },
      select: {
        system: true
      }
    })

    return Boolean(config.system)
  }

  async updateOne(id: string, data: UpdateConfigDto) {
    if (await this.isSystemConfig(id)) {
      throw new AppBadRequestException(
        this.i18n.t('config.cannotModifyBuiltIn', {
          lang: I18nContext?.current()?.lang,
        }),
      )
    }

    const { translations, ...rest } = data
    return this.model.update({
      where: {
        id,
      },
      data: {
        ...rest,
        translations: translations && {
          deleteMany: {},
          create: translations,
        },
      },
    })
  }

  async deleteOne(id: string) {
    try {
      const item = await this.model.findUnique({
        where: { id }
      })

      if (item?.system) {
        throw new AppBadRequestException(
          this.i18n.t('config.cannotDeleteSystem', {
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
    } catch (err) {
      throw err
    }
  }
}