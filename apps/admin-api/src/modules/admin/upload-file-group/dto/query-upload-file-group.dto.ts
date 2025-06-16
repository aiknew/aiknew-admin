import { IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { PaginationDto } from '@aiknew/shared-api-dtos'

export class QueryUploadFileGroupDto extends PaginationDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  parentId?: number
}
