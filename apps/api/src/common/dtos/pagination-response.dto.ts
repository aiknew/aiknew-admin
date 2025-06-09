import { ApiProperty } from '@nestjs/swagger'

export class PaginationResponseDto<Data> {
  current: number

  pageSize: number

  total: number

  // set the @ApiProperty decorator here to solve the circular dependency issue
  @ApiProperty()
  list: Data
}
