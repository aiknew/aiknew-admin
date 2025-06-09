import { PaginationDto } from 'src/common/dtos'
import { CreateArticleCategoryDto } from './dto/create-article-category.dto'
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto'
import { AppConflictException } from 'src/common/exceptions'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/global/prisma/prisma.service'
import { getArticleCateAncestors } from '@prisma/client/sql'
import { ArticleCategoryDto } from './dto/article-category.dto'
import { ArticleCategoryTranslationDto } from './dto/article-category-translation.dto'
import { isDate } from 'lodash-es'

@Injectable()
export class ArticleCategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  async pagination(paginationDto: PaginationDto) {
    return this.prisma.articleCategory.paginate(paginationDto, {
      where: {
        parentId: 0,
      },
      include: {
        translations: true,
      },
    })
  }

  async getChildren(id: number) {
    return await this.prisma.articleCategory.findMany({
      where: {
        parentId: id,
      },

      include: {
        translations: {
          select: {
            name: true,
            langKey: true,
          },
        },
      },
    })
  }

  async findAncestors(id: number | number[]) {
    const articleCateList = await this.prisma.$queryRawTyped(
      getArticleCateAncestors([id].flat()),
    )
    const res: ArticleCategoryDto[] = []
    const idPathMap = new Map<number, number[]>()

    for (const cate of articleCateList) {
      if (cate.parentId === 0 && cate.idPath) {
        const arr = cate.idPath.split('-').map((id) => Number(id))
        const targetId = arr[arr.length - 1]
        if (!idPathMap.has(targetId)) {
          idPathMap.set(targetId, arr)
        }
      }

      let target: ArticleCategoryDto | undefined = res.find(
        (item) => item.id === cate.id,
      )

      const translation: ArticleCategoryTranslationDto = {
        langKey: cate.langKey,
        name: cate.name,
      }

      if (target) {
        target.translations
          ? target.translations.push(translation)
          : (target.translations = [translation])
      } else {
        if (
          typeof cate.id === 'string' &&
          typeof cate.parentId === 'number' &&
          typeof cate.order === 'number' &&
          typeof cate.status === 'boolean' &&
          isDate(cate.createdAt) &&
          isDate(cate.updatedAt)
        ) {
          target = {
            id: cate.id,
            parentId: cate.parentId,
            status: cate.status,
            order: cate.order,
            createdAt: cate.createdAt,
            updatedAt: cate.updatedAt,
            translations: [translation],
          }

          res.push(target)
        }
      }
    }

    return {
      idPath: Object.fromEntries(idPathMap),
      list: res,
    }
  }

  async getChildrenCategory(parentId: number) {
    return this.prisma.articleCategory.findMany({
      where: {
        parentId,
      },

      include: {
        translations: true,
      },
    })
  }

  async createOne(data: CreateArticleCategoryDto) {
    const { translations, ...info } = data
    await this.prisma.articleCategory.create({
      data: {
        ...info,
        translations: {
          create: translations,
        },
      },
    })
  }

  async updateOne(id: number, data: UpdateArticleCategoryDto) {
    const { translations, ...info } = data
    await this.prisma.articleCategory.update({
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

  async countChildren(parentId: number) {
    return this.prisma.articleCategory.count({
      where: {
        parentId,
      },
    })
  }

  async deleteOne(id: number) {
    try {
      if (await this.countChildren(id)) {
        throw new AppConflictException(
          this.i18n.t('article-category.hasChildren', {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      const deleteTranslations =
        this.prisma.articleCategoryTranslation.deleteMany({
          where: { articleCategoryId: id },
        })

      const deleteCategory = this.prisma.articleCategory.delete({
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
