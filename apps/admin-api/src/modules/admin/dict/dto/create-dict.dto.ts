import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { DictTranslationDto } from "./dict-translation.dto"
import { ValidateTranslations } from "src/common/validators"
import { Type } from "class-transformer"

export class CreateDictDto {
  @IsString()
  value: string

  @IsString()
  dictTypeId: string

  @IsNumber()
  @IsOptional()
  order?: number

  @IsBoolean()
  @IsOptional()
  status?: boolean = true

  @ValidateNested()
  @ValidateTranslations(DictTranslationDto)
  @Type(() => DictTranslationDto)
  translations: DictTranslationDto[]
}