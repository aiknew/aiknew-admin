import 'vue-router'
import type { RouteType } from '@/api/auth-route'

export type AdminRouteTranslations = {
  langKey: string
  routeName: string
}[]

export interface CustomRouteMeta {
  hidden?: boolean
  icon?: string
  id?: string
  routeName?: string
  translations?: AdminRouteTranslations
  type?: RouteType
}

declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta {}
}
