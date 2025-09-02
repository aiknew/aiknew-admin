import { AdminRouteItem } from '../types'
import { RouteType } from '../../../../src/prisma-client'
import { i18n } from '../i18n'

export const settings: AdminRouteItem = {
  icon: 'Setting',
  path: '/settings',
  redirect: '/settings/admin-user',
  type: RouteType.GROUP,
  name: i18n.settings,
  children: [
    {
      path: '/settings/permission',
      type: RouteType.SMALL_GROUP,
      name: i18n.permissionSettings,
      children: [
        {
          component: 'settings/auth-role/auth-role',
          icon: 'Avatar',
          path: '/settings/permissions/admin-role',
          type: RouteType.MENU,
          name: i18n.characterSettings,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
            },
          ],
        },
        {
          component: 'settings/auth-route/auth-route',
          icon: 'Operation',
          path: '/settings/permissions/admin-route',
          type: RouteType.MENU,
          name: i18n.menuSettings,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
            },
          ],
        },
        {
          component: 'settings/admin-permission/admin-permission',
          icon: 'Document',
          path: '/settings/permissions/permission',
          type: RouteType.MENU,
          name: i18n.permissionSettings,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
            },
          ],
        },
      ],
    },
    {
      type: RouteType.SMALL_GROUP,
      name: i18n.systemSetting,
      children: [
        {
          component: 'settings/storage-setting/storage-setting',
          icon: 'Setting',
          path: '/settings/storage-setting',
          type: RouteType.MENU,
          name: i18n.storageSetting,
        },
        {
          name: i18n.dictSettings,
          component: 'settings/dict-type/dict-type',
          icon: 'Notebook',
          path: '/settings/dict-type',
          type: RouteType.MENU
        },
        {
          name: i18n.configSettings,
          component: 'settings/config/config-view',
          icon: 'Operation',
          path: '/settings/config',
          type: RouteType.MENU
        },
        {
          component: 'settings/admin-user/admin-user',
          icon: 'User',
          path: '/settings/admin-user',
          type: RouteType.MENU,
          name: i18n.adminUsers,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
            },
          ],
        },
      ],
    },
  ],
} as const
