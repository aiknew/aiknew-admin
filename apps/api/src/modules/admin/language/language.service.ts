import { BadRequestException, Injectable } from '@nestjs/common'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import { CreateLanguageDto } from './dto/create-language.dto'
import { Prisma } from '@prisma/client'
import { UpdateLanguageDto } from './dto/update-language.dto'
import {
  AppBadRequestException,
  AppConflictException,
} from 'src/common/exceptions'
import { SystemSettingService } from '../system-setting/system-setting.service'
import { SystemSettingKey } from 'src/common/enums'
import { PrismaService } from 'src/modules/global/prisma/prisma.service'

@Injectable()
export class LanguageService {
  constructor(
    private prisma: PrismaService,
    private systemSettingService: SystemSettingService,
  ) {}

  async pagination(paginationDto: PaginationDto) {
    return await this.prisma.language.paginate(paginationDto)
  }

  async getEnabledLanguages() {
    return await this.prisma.language.findMany({
      where: {
        status: true,
      },
    })
  }

  async createLanguage(data: CreateLanguageDto) {
    try {
      return await this.prisma.language.create({
        data,
      })
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new AppConflictException('The same language already exists.')
      }

      throw err
    }
  }

  async updateLanguage(key: string, data: UpdateLanguageDto) {
    try {
      await this.prisma.language.update({
        where: { key },
        data,
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            throw new AppBadRequestException('Non-existent Language')
        }
      }

      throw err
    }
  }

  async removeLanguage(key: string) {
    try {
      await this.prisma.language.delete({
        where: {
          key,
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            throw new AppBadRequestException('Non-existent Language')
        }
      }

      throw err
    }
  }

  async getEnabledLangs() {
    const setting = await this.systemSettingService.getSystemSetting(
      SystemSettingKey.LANGUAGE,
    )

    if (setting.enableMultilingual) {
      return this.prisma.language.findMany({
        where: {
          status: true,
        },
      })
    }

    // single language
    const lang = await this.prisma.language.findUnique({
      where: {
        key: setting.mainLanguage,
      },
    })

    if (!lang) {
      throw new BadRequestException()
    }

    return [lang]
  }
}
