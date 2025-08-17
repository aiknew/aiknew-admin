import 'vue-router'
import type { RouteType } from '@/api/auth-route'
import { type ComputedRef } from 'vue'

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

export type RouteHistory = {
  path: string
  meta: {
    name: ComputedRef<string> | string
    icon?: string
  }
}

declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta {}
}
