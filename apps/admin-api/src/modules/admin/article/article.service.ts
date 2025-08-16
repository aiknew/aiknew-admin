import { Injectable } from '@nestjs/common'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Prisma, PrismaService } from '@aiknew/shared-admin-db'
import {
  AppBadRequestException,
  AppNotFoundException,
} from '@aiknew/shared-api-exceptions'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  get model() {
    return this.prisma.article
  }

  get translationModel() {
    return this.prisma.articleTranslation
  }

  async pagination(pagination: PaginationDto) {
    return this.model.paginate(pagination, {
      include: {
        translations: true,
      },
    })
  }

  async getDetail(id: number) {
    const detail = await this.model.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    })

    if (!detail) {
      throw new AppNotFoundException()
    }

    return detail
  }

  async createOne(data: CreateArticleDto) {
    try {
      const { translations, ...info } = data
      await this.model.create({
        data: {
          ...info,
          translations: {
            create: translations,
          },
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2003':
            throw new AppBadRequestException(
              this.i18n.t('article.invalidCategoryId', {
                lang: I18nContext.current()?.lang,
              }),
            )

          case 'P2002':
            throw new AppBadRequestException(
              this.i18n.t('article.invalidTitle', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
      throw err
    }
  }

  async updateOne(id: number, data: UpdateArticleDto) {
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

  async deleteOne(articleId: number) {
    const deleteTranslations = this.translationModel.deleteMany({
      where: { articleId },
    })

    const deleteArticle = this.model.delete({
      where: { id: articleId },
    })

    await this.prisma.$transaction([deleteTranslations, deleteArticle])
  }
}
