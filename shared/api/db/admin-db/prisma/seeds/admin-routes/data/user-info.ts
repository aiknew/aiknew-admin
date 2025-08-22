import { AdminRouteItem } from '../types'
import { RouteType } from '../../../../src/prisma-client'
import { i18n } from '../i18n'

export const userInfo: AdminRouteItem = {
  component: 'settings/user-info/user-info',
  hidden: true,
  icon: '',
  key: '',
  path: '/account-info',
  order: 10,
  redirect: '',
  type: RouteType.MENU,
  status: true,
  name: i18n.updateAccountInfo,
  children: [
    {
      component: '',
      hidden: false,
      icon: '',
      key: 'update',
      path: '-',
      order: 10,
      redirect: '',
      type: RouteType.BUTTON,
      status: true,
      name: i18n.edit,
    },
  ],
} as const
