import type { ResponseStatusCode } from '@aiknew/shared-api-enums'

export interface IResponseJson {
  code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode]

  data: Record<string, unknown>

  msg: string
}
