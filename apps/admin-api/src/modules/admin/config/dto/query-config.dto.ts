import { PaginationDto } from "@aiknew/shared-api-dtos"
import { IsOptional, IsString } from "class-validator"

export class QueryConfigDto extends PaginationDto {
  @IsString()
  @IsOptional()
  key?: string

  @IsString()
  @IsOptional()
  value?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  remark?: string
}
