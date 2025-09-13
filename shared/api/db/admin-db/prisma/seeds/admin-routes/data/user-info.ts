import { AdminRouteItem } from '../types'
import { RouteType } from '../../../../src/prisma-client'
import { i18n } from '../i18n'

export const userInfo: AdminRouteItem = {
  component: 'settings/user-info/user-info',
  hidden: true,
  path: '/account-info',
  type: RouteType.MENU,
  name: i18n.updateAccountInfo,
  order: 500,
  children: [
    {
      key: 'update',
      type: RouteType.BUTTON,
      name: i18n.edit,
    },
  ],
} as const
