import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { DictTypeTranslationDto } from "./dict-type-translation.dto"
import { ValidateTranslations } from "src/common/validators"
import { Type } from "class-transformer"

export class CreateDictTypeDto {
  @IsString()
  key: string

  @IsNumber()
  @IsOptional()
  order?: number

  @IsBoolean()
  @IsOptional()
  status?: boolean = true

  @ValidateNested()
  @ValidateTranslations(DictTypeTranslationDto)
  @Type(() => DictTypeTranslationDto)
  translations: DictTypeTranslationDto[]
}
