import { IsString, ValidateNested } from "class-validator"
import { SystemConfigTranslationDto } from "./system-config-translation.dto"
import { ValidateTranslations } from "../../../../common/validators"
import { Type } from "class-transformer"

export class CreateSystemConfigDto {
  @IsString()
  key: string

  @IsString()
  value: string

  @ValidateNested()
  @ValidateTranslations(SystemConfigTranslationDto)
  @Type(() => SystemConfigTranslationDto)
  translations: SystemConfigTranslationDto[]
}
