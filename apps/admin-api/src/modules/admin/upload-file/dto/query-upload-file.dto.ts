import { IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import { IUploadFileQuery } from '@aiknew/shared-types'

export class QueryUploadFileDto
  extends PaginationDto
  implements IUploadFileQuery
{
  @IsString()
  @IsOptional()
  parentId?: string

  @IsString()
  @IsOptional()
  keyword?: string
}
