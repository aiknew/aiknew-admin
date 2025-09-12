import { PaginationDto } from "@aiknew/shared-api-dtos";
import { IsOptional, IsString } from "class-validator";

export class QueryDictTypeDto extends PaginationDto {
  @IsString()
  @IsOptional()
  key?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  remark?: string
}