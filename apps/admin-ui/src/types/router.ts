import type { RouteType } from '@/api/auth-route'
import 'vue-router'

export type AdminRouteTranslations = {
  langKey: string
  routeName: string
}[]

declare module 'vue-router' {
  interface RouteMeta {
    hidden?: boolean
    icon?: string
    id?: string
    translations: AdminRouteTranslations
    type?: RouteType
  }
}
