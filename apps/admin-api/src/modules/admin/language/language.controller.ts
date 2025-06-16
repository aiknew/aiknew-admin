import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { LanguageService } from './language.service'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import {
  AppApiPaginationResponse,
  AppApiBadRequestResponse,
  AppApiConflictResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
  Public,
} from '@aiknew/shared-api-decorators'
import { LanguageItemDto } from './dto/language-item.dto'
import { CreateLanguageDto } from './dto/create-language.dto'
import { PaginationResponseDto } from '@aiknew/shared-api-dtos'
import { UpdateLanguageDto } from './dto/update-language.dto'

@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Get()
  @AppApiPaginationResponse(LanguageItemDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<LanguageItemDto[]>> {
    return await this.languageService.pagination(paginationDto)
  }

  @Get('enabled')
  @Public()
  @AppApiOkResponse([LanguageItemDto])
  enabled(): Promise<LanguageItemDto[]> {
    return this.languageService.getEnabledLangs()
  }

  @Post()
  @AppApiBadRequestResponse()
  @AppApiCreatedResponse()
  @AppApiConflictResponse()
  async create(@Body() createLanguageDto: CreateLanguageDto) {
    await this.languageService.createLanguage(createLanguageDto)
  }

  @Patch(':key')
  @AppApiOkResponse()
  @AppApiBadRequestResponse()
  async update(
    @Param('key') key: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    await this.languageService.updateLanguage(key, updateLanguageDto)
  }

  @Delete(':key')
  @AppApiOkResponse()
  @AppApiBadRequestResponse()
  async remove(@Param('key') key: string) {
    await this.languageService.removeLanguage(key)
  }
}
