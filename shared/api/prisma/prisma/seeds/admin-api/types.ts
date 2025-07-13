import { RequestMethod } from '../prisma'

export type ApiItem = {
  apiName: Promise<Record<string, any>>
  url: string
  method: RequestMethod
  parentId?: string
  children?: ApiItem[]
}
