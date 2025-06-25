import 'vue-router'

export type RouteType = 'GROUP' | 'SMALL_GROUP' | 'MENU' | 'BUTTON'

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
