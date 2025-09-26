import { Injectable } from '@nestjs/common'
import { CreateLanguageDto } from './dto/create-language.dto'
import { Prisma, PrismaService } from '@aiknew/shared-admin-db'
import { UpdateLanguageDto } from './dto/update-language.dto'
import {
  AppBadRequestException,
} from '@aiknew/shared-api-exceptions'
import { QueryLanguageDto } from './dto/query-language.dto'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class LanguageService {
  constructor(
    private prisma: PrismaService,
    private i18n: I18nService
  ) { }

  get model(): PrismaService['language'] {
    return this.prisma.language
  }

  async pagination(query: QueryLanguageDto) {
    const { currentPage, pageSize, key, name, orientation, status } = query

    return await this.model.paginate(
      { currentPage, pageSize },
      {
        where: {
          key: {
            contains: key,
            mode: 'insensitive'
          },
          name: {
            contains: name,
            mode: 'insensitive'
          },
          orientation,
          status
        },
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ]
      }
    )
  }

  async getEnabledLanguages() {
    return await this.model.findMany({
      where: {
        status: true,
      },
    })
  }

  async createLanguage(data: CreateLanguageDto) {
    try {
      return await this.model.create({
        data,
      })
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new AppBadRequestException(this.i18n.t('language.alreadyExist', {
          lang: I18nContext.current()?.lang
        }))
      }

      throw err
    }
  }

  async getEnabledCount(exceptKey?: string) {
    return await this.model.count({
      where: {
        status: true,
        NOT: {
          key: exceptKey
        }
      }
    })
  }


  async updateLanguage(key: string, data: UpdateLanguageDto) {
    try {
      const status = data.status

      if (!status && (await this.getEnabledCount(key)) === 0) {
        throw new AppBadRequestException(this.i18n.t('language.atLeastOne', {
          lang: I18nContext.current()?.lang
        }))
      }

      await this.model.update({
        where: { key },
        data,
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            throw new AppBadRequestException(this.i18n.t('language.nonExistent', {
              lang: I18nContext.current()?.lang
            }))
        }
      }

      throw err
    }
  }

  async removeLanguage(key: string) {
    try {

      if ((await this.getEnabledCount(key)) === 0) {
        throw new AppBadRequestException(this.i18n.t('language.atLeastOne', {
          lang: I18nContext.current()?.lang
        }))
      }

      await this.model.delete({
        where: {
          key,
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            throw new AppBadRequestException(this.i18n.t('language.nonExistent', {
              lang: I18nContext.current()?.lang
            }))
          case 'P2003':
            throw new AppBadRequestException(this.i18n.t('language.hasRelated', {
              lang: I18nContext.current()?.lang
            }))
        }
      }

      throw err
    }
  }

}
