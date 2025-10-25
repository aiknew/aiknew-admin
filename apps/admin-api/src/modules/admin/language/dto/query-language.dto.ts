import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsBoolean, IsEnum } from "class-validator"
import { PaginationDto } from "@aiknew/shared-api-dtos"
import { LanguageOrientation } from "@aiknew/shared-admin-db"
import { Transform } from "class-transformer"

export class QueryLanguageDto extends PaginationDto {
  @IsOptional()
  @IsString()
  key?: string

  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ enum: LanguageOrientation })
  @IsOptional()
  @IsEnum(LanguageOrientation)
  orientation?: LanguageOrientation

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === "boolean") {
      return value
    }
    if (typeof value === "string") {
      const v = value.toLowerCase().trim()
      if (v === "true" || v === "1") return true
      if (v === "false" || v === "0") return false
    }
    return
  })
  @IsBoolean()
  status?: boolean
}
