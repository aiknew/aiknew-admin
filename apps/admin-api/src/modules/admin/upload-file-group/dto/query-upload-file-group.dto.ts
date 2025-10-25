import { IsOptional, IsString } from "class-validator"
import { PaginationDto } from "@aiknew/shared-api-dtos"

export class QueryUploadFileGroupDto extends PaginationDto {
  @IsString()
  @IsOptional()
  parentId?: string
}
