import type { components } from './open-api'

export interface ResponseBody {
  msg: string
  code: number
  data: Record<string, unknown>
}

export type ResponseJson = Omit<components['schemas']['ResponseJson'], 'data'> & {
  data: Record<string, unknown>
}

export type PaginationDto = components['schemas']['PaginationDto']
