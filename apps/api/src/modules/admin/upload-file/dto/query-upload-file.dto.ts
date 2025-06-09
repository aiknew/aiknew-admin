import { IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/common/dtos'

export class QueryUploadFileDto extends PaginationDto {
  @IsString()
  @IsOptional()
  parentId?: string

  @IsString()
  @IsOptional()
  keyword?: string
}
