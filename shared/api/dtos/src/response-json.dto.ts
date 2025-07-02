import { ApiProperty } from '@nestjs/swagger'
import { type Type } from '@nestjs/common'
import { ResponseStatusCode } from '@aiknew/shared-api-enums'
import { IResponseJson } from '@aiknew/shared-types'

export class ResponseJson<
  Data extends Record<string, unknown> | Type<any> = Record<string, unknown>,
> implements IResponseJson
{
  @ApiProperty({
    enumName: 'ResponseStatusCode',
    enum: ResponseStatusCode,
    'x-enumNames': Object.keys(ResponseStatusCode),
  })
  code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode]

  // set @ApiProperty decorator here to solve the circular dependency issue
  @ApiProperty({ type: () => Object })
  data: Data

  // set @ApiProperty decorator here to solve the circular dependency issue
  @ApiProperty({ type: () => String })
  msg: string
}
