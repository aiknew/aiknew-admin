import { ApiProperty } from '@nestjs/swagger'
import type { IPaginationData } from '@aiknew/shared-types'

export class PaginationResponseDto<Data> implements IPaginationData<Data> {
  // set the @ApiProperty decorator here to solve the circular dependency issue
  @ApiProperty({ type: () => Number })
  current: number

  // set the @ApiProperty decorator here to solve the circular dependency issue
  @ApiProperty({ type: () => Number })
  pageSize: number

  // set the @ApiProperty decorator here to solve the circular dependency issue
  @ApiProperty({ type: () => Number })
  total: number

  // set the @ApiProperty decorator here to solve the circular dependency issue
  @ApiProperty({ type: () => Object })
  list: Data
}
