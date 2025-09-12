import { PaginationDto } from "@aiknew/shared-api-dtos"
import { IsOptional, IsString } from "class-validator"

export class QueryArticleDto extends PaginationDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  content?: string
}