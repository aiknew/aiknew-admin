import { i18n } from './i18n'
import { RouteType } from '../../../../src/prisma-client'

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


export const defineRouteItem = (item: AdminRouteItem) => {
  return item
}

export { RouteType }