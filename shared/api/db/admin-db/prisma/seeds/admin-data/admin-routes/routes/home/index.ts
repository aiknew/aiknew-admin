import { defineRouteItem, RouteType } from '../../types'
import { i18n } from '../../i18n'

export const homePage = defineRouteItem({
  component: 'home-page',
  icon: 'House',
  path: '/home',
  type: RouteType.MENU,
  name: i18n.homePage,
  order: 0,
})