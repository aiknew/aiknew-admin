import { IsOptional, IsString } from "class-validator"

export class DictTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  label: string

  @IsString()
  @IsOptional()
  remark?: string = ""
}
