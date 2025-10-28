import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber } from "class-validator"
import type { IPaginationQuery } from "@aiknew/shared-types"

// use with Query decorator in Controller
export class PaginationDto implements IPaginationQuery {
  @ApiProperty({ type: () => Number })
  @Type(() => Number)
  @IsNumber()
  currentPage: number

  @ApiProperty({ type: () => Number })
  @Type(() => Number)
  @IsNumber()
  pageSize: number
}
