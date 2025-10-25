import { IsOptional, IsString, ValidateIf } from "class-validator"
import { PaginationDto } from "@aiknew/shared-api-dtos"
import { IUploadFileQuery } from "@aiknew/shared-types"

export class QueryUploadFileDto
  extends PaginationDto
  implements IUploadFileQuery
{
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @IsOptional()
  parentId?: string | null

  @IsString()
  @IsOptional()
  keyword?: string
}
