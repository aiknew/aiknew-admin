import { CreateArticleCategoryDto } from './dto/create-article-category.dto'
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto'
import { AppConflictException } from '@aiknew/shared-api-exceptions'
import { I18nContext, I18nService } from 'nestjs-i18n'
import {
  Prisma,
  PrismaService,
} from '@aiknew/shared-admin-db'
import { Injectable } from '@nestjs/common'
import { QueryArticleCategoryDto } from './dto/query-article-category.dto'

@Injectable()
export class ArticleCategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) { }

  get model(): PrismaService['articleCategory'] {
    return this.prisma.articleCategory
  }

  get translationModel(): PrismaService['articleCategoryTranslation'] {
    return this.prisma.articleCategoryTranslation
  }

  async getAll(query: QueryArticleCategoryDto) {
    const { name } = query

    return this.model.findMany({
      where: {
        translations: {
          some: {
            name: {
              contains: name
            }
          }
        }
      },
      include: {
        translations: true
      },
      orderBy: [
        {
          order: 'asc'
        },
        {
          'createdAt': 'desc'
        }
      ]
    })
  }

  async createOne(data: CreateArticleCategoryDto) {
    const { translations, ...info } = data
    await this.model.create({
      data: {
        ...info,
        translations: {
          create: translations,
        },
      },
    })
  }

  async updateOne(id: string, data: UpdateArticleCategoryDto) {
    const { translations, ...info } = data
    await this.model.update({
      where: { id },
      data: {
        ...info,
        translations: {
          deleteMany: {},
          create: translations,
        },
      },
    })
  }

  async countChildren(parentId: string) {
    return this.model.count({
      where: {
        parentId,
      },
    })
  }

  async deleteOne(id: string) {
    try {
      if (await this.countChildren(id)) {
        throw new AppConflictException(
          this.i18n.t('article-category.hasChildren', {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      const deleteTranslations = this.translationModel.deleteMany({
        where: { articleCategoryId: id },
      })

      const deleteCategory = this.model.delete({
        where: { id },
      })

      await this.prisma.$transaction([deleteTranslations, deleteCategory])
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2003':
            throw new AppConflictException(
              this.i18n.t('article-category.haveRelated', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }
}
