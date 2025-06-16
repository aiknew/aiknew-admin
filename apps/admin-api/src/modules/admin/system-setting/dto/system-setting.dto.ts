import { SystemSettingKey } from '@aiknew/shared-api-enums'
import { LanguageSettingDto } from './language-setting.dto'
import { IsObject, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

type SystemSettingKeyConstrict = {
  [key in keyof typeof SystemSettingKey]: unknown
}

export class SystemSettingDto implements SystemSettingKeyConstrict {
  @ValidateNested()
  @IsObject()
  @Type(() => LanguageSettingDto)
  LANGUAGE: LanguageSettingDto
}
