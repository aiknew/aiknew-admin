import { IsOptional, IsString } from "class-validator"

export class QueryArticleCategoryDto {
  @IsString()
  @IsOptional()
  name?: string
}
