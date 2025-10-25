import { IsString, ValidateNested } from "class-validator"
import { ConfigTranslationDto } from "./config-translation.dto"
import { ValidateTranslations } from "../../../../common/validators"
import { Type } from "class-transformer"

export class CreateConfigDto {
  @IsString()
  key: string

  @IsString()
  value: string

  @ValidateNested()
  @ValidateTranslations(ConfigTranslationDto)
  @Type(() => ConfigTranslationDto)
  translations: ConfigTranslationDto[]
}
