import { SystemSettingKey } from '@aiknew/shared-api-enums'
import { LanguageSettingDto } from './language-setting.dto'
import { IsObject, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { StorageSettingDto } from './storage-setting.dto'

type SystemSettingKeyConstrict = {
  [key in keyof typeof SystemSettingKey]?: unknown
}

export class SystemSettingDto implements SystemSettingKeyConstrict {
  @ValidateNested()
  @IsObject()
  @Type(() => LanguageSettingDto)
  @IsOptional()
  LANGUAGE?: LanguageSettingDto

  @ValidateNested()
  @IsObject()
  @Type(() => StorageSettingDto)
  @IsOptional()
  STORAGE?: StorageSettingDto
}
