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
  PermissionGroup,
  Permission,
} from '@aiknew/shared-api-decorators'
import { LanguageItemDto } from './dto/language-item.dto'
import { CreateLanguageDto } from './dto/create-language.dto'
import { PaginationResponseDto } from '@aiknew/shared-api-dtos'
import { UpdateLanguageDto } from './dto/update-language.dto'

@PermissionGroup({ name: 'language.languageManagement' })
@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) { }

  @Permission({ key: 'language:pagination', name: 'language.languagePagination' })
  @Get()
  @AppApiPaginationResponse(LanguageItemDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<LanguageItemDto[]>> {
    return await this.languageService.pagination(paginationDto)
  }

  @Permission({ key: 'language:getEnabled', name: 'language.languageGetEnabled' })
  @Get('enabled')
  @Public()
  @AppApiOkResponse([LanguageItemDto])
  enabled(): Promise<LanguageItemDto[]> {
    return this.languageService.getEnabledLangs()
  }

  @Permission({ key: 'language:create', name: 'language.languageCreate' })
  @Post()
  @AppApiBadRequestResponse()
  @AppApiCreatedResponse()
  @AppApiConflictResponse()
  async create(@Body() createLanguageDto: CreateLanguageDto) {
    await this.languageService.createLanguage(createLanguageDto)
  }

  @Permission({ key: 'language:update', name: 'language.languageUpdate' })
  @Patch(':key')
  @AppApiOkResponse()
  @AppApiBadRequestResponse()
  async update(
    @Param('key') key: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    await this.languageService.updateLanguage(key, updateLanguageDto)
  }

  @Permission({ key: 'language:delete', name: 'language.languageDelete' })
  @Delete(':key')
  @AppApiOkResponse()
  @AppApiBadRequestResponse()
  async remove(@Param('key') key: string) {
    await this.languageService.removeLanguage(key)
  }
}
