import { PaginationDto } from "@aiknew/shared-api-dtos";
import { IsString } from "class-validator";

export class QueryDictDto extends PaginationDto {
  @IsString()
  dictTypeId: string
}