import { Injectable } from '@nestjs/common'
import { PrismaService } from '@aiknew/shared-admin-db'
import { CreateDictDto } from './dto/create-dict.dto'
import { UpdateDictDto } from './dto/update-dict.dto'
import { QueryDictDto } from './dto/query-dict.dto'

@Injectable()
export class DictService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  get model() {
    return this.prisma.dict
  }

  get translationModel() {
    return this.prisma.dictTranslation
  }

  async pagination(query: QueryDictDto) {
    const { dictTypeId, ...paginationDto } = query
    return this.model.paginate(paginationDto, {
      where:
      {
        dictTypeId
      },
      include: {
        translations: true,
      },
    })
  }

  async createOne(data: CreateDictDto) {
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

  async updateOne(id: string, data: UpdateDictDto) {
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
      const deleteTranslations = this.translationModel.deleteMany({
        where: {
          dictId: id,
        },
      })

      const deleteDict = this.model.delete({
        where: {
          id,
        },
      })

      await this.prisma.$transaction([deleteTranslations, deleteDict])
    } catch (err) {
      throw err
    }
  }
}