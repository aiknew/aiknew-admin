import { IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '@aiknew/shared-api-dtos'

export class QueryUploadFileDto extends PaginationDto {
  @IsString()
  @IsOptional()
  parentId?: string

  @IsString()
  @IsOptional()
  keyword?: string
}
