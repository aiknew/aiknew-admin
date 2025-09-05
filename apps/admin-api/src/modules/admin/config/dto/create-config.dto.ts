import { IsBoolean, IsOptional, IsString, ValidateNested } from "class-validator"
import { ConfigTranslationDto } from "./config-translation.dto"
import { ValidateTranslations } from "../../../../common/validators"
import { Type } from "class-transformer"

export class CreateConfigDto {
  @IsString()
  key: string

  @IsString()
  value: string

  @IsBoolean()
  @IsOptional()
  system?: boolean = false

  @ValidateNested()
  @ValidateTranslations(ConfigTranslationDto)
  @Type(() => ConfigTranslationDto)
  translations: ConfigTranslationDto[]
}