import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

// use with Query decorator in Controller
export class PaginationDto {
  @ApiProperty({ type: () => Number })
  @Type(() => Number)
  @IsNumber()
  currentPage: number

  @ApiProperty({ type: () => Number })
  @Type(() => Number)
  @IsNumber()
  pageSize: number
}
