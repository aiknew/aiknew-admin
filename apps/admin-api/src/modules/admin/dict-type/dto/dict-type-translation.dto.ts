import { IsOptional, IsString } from "class-validator"

export class DictTypeTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  name: string

  @IsString()
  @IsOptional()
  remark?: string = ""
}