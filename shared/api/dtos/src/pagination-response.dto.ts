import { ApiProperty } from '@nestjs/swagger'

export class PaginationResponseDto<Data> {
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
