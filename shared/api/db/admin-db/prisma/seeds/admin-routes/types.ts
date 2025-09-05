import { RouteType } from '../../../src/prisma-client'
import { i18n } from './i18n'

type AdminRouteItemBase = {
  icon?: string
  redirect?: string
  hidden?: boolean
  component?: string
  type?: RouteType
  key?: string
  status?: boolean
  path?: string
  parentId?: string
  order?: number
}

export type AdminRouteItem = AdminRouteItemBase & { name: (typeof i18n)[keyof typeof i18n]; children?: AdminRouteItem[], permissions?: string[] }
