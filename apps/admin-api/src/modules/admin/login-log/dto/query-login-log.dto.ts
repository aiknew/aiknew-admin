import { PaginationDto } from "@aiknew/shared-api-dtos"
import { IsOptional, IsString } from "class-validator"

export class QueryLoginLogDto extends PaginationDto {
  @IsString()
  @IsOptional()
  userName?: string

  @IsString()
  @IsOptional()
  ip?: string

  @IsString()
  @IsOptional()
  location?: string

  @IsString()
  @IsOptional()
  os?: string

  @IsString()
  @IsOptional()
  browser?: string
}
