import type { ResponseStatusCode } from '@aiknew/shared-api-enums'
import type { Type } from '@nestjs/common'

export interface IResponseJson {
  code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode]

  data: Record<string, unknown> | Type<any>

  msg: string
}
