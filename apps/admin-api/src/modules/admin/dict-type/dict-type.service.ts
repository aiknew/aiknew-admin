import { Injectable } from '@nestjs/common'
import { PrismaService } from '@aiknew/shared-admin-db'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import { CreateDictTypeDto } from './dto/create-dict-type.dto'
import { UpdateDictTypeDto } from './dto/update-dict-type.dto'
import { AppConflictException } from '@aiknew/shared-api-exceptions'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class DictTypeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) { }

  get model() {
    return this.prisma.dictType
  }

  get translationModel() {
    return this.prisma.dictTypeTranslation
  }

  get dictModel() {
    return this.prisma.dict
  }

  async pagination(paginationDto: PaginationDto) {
    return this.model.paginate(paginationDto, {
      include: {
        translations: true,
      },
    })
  }

  async getAll() {
    return this.model.findMany({
      include: {
        translations: true,
      },
      orderBy: {
        order: 'asc'
      }
    })
  }


  async createOne(data: CreateDictTypeDto) {
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

  async updateOne(id: string, data: UpdateDictTypeDto) {
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
      const count = await this.dictModel.count({
        where: {
          dictTypeId: id,
        },
      })

      if (count > 0) {
        throw new AppConflictException(
          this.i18n.t('dict-type.haveChild', {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      const deleteTranslations = this.translationModel.deleteMany({
        where: {
          dictTypeId: id,
        },
      })

      const deleteDictType = this.model.delete({
        where: {
          id,
        },
      })

      await this.prisma.$transaction([deleteTranslations, deleteDictType])
    } catch (err) {
      throw err
    }
  }
}
