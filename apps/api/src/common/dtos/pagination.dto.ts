import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

// use with Query decorator in Controller
export class PaginationDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  currentPage: number

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  pageSize: number
}
