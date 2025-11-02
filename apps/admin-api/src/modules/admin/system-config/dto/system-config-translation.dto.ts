import { IsOptional, IsString } from "class-validator"

export class SystemConfigTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  name: string

  @IsString()
  @IsOptional()
  remark?: string = ""
}
