import { IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { PaginationDto } from 'src/common/dtos'

export class QueryUploadFileGroupDto extends PaginationDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  parentId?: number
}
