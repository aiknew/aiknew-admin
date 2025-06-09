import { ApiProperty } from '@nestjs/swagger'
import { Type } from '@nestjs/common'
import { ResponseStatusCode } from '../enums'

export class ResponseJson<
  Data extends Record<string, unknown> | Type<any> = Record<string, unknown>,
> {
  @ApiProperty({
    enumName: 'ResponseStatusCode',
    enum: ResponseStatusCode,
    'x-enumNames': Object.keys(ResponseStatusCode),
  })
  code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode]

  // set @ApiProperty decorator here to solve the circular dependency issue
  @ApiProperty()
  data: Data

  @ApiProperty()
  msg: string
}
