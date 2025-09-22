import { Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Prisma, PrismaService } from '@aiknew/shared-admin-db'
import {
  AppBadRequestException,
  AppNotFoundException,
} from '@aiknew/shared-api-exceptions'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { QueryArticleDto } from './dto/query-article.dto'

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
  ) { }

  get model(): PrismaService['article'] {
    return this.prisma.article
  }

  get translationModel(): PrismaService['articleTranslation'] {
    return this.prisma.articleTranslation
  }

  async pagination(query: QueryArticleDto) {
    const { content, title, ...pagination } = query
    return this.model.paginate(pagination, {
      where: {
        translations: {
          some: {
            content: {
              contains: content
            },
            title: {
              contains: title
            }
          }
        }
      },
      include: {
        translations: true,
        coverImage: {
          include: {
            storage: {
              select: {
                id: true,
                hostname: true,
                bucket: true,
                endpoint: true,
                type: true
              }
            }
          }
        }
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
  }

  async getDetail(id: number) {
    const detail = await this.model.findUnique({
      where: { id },
      include: {
        translations: true,
        coverImage: true
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
