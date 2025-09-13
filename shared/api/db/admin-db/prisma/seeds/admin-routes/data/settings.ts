import { AdminRouteItem } from '../types'
import { RouteType } from '../../../../src/prisma-client'
import { i18n } from '../i18n'

export const settings: AdminRouteItem = {
  icon: 'Setting',
  path: '/settings',
  redirect: '/settings/admin-user',
  type: RouteType.GROUP,
  name: i18n.settings,
  order: 300,
  children: [
    {
      path: '/settings/permission',
      type: RouteType.SMALL_GROUP,
      name: i18n.permissionSettings,
      order: 301,
      children: [
        {
          component: 'settings/auth-role/auth-role',
          icon: 'Avatar',
          path: '/settings/permissions/admin-role',
          type: RouteType.MENU,
          name: i18n.characterSettings,
          permissions: ['auth-role:pagination', 'auth-role:getAll', 'auth-route:getChildren'],
          order: 302,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
              permissions: ['auth-role:create']
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
              permissions: ['auth-role:update']
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
              permissions: ['auth-role:delete']
            },
          ],
        },
        {
          component: 'settings/auth-route/auth-route',
          icon: 'Operation',
          path: '/settings/permissions/admin-route',
          type: RouteType.MENU,
          name: i18n.menuSettings,
          permissions: ['auth-route:getAll'],
          order: 303,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
              permissions: ['auth-route:create']
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
              permissions: ['auth-route:update']
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
              permissions: ['auth-route:delete']
            },
          ],
        },
        {
          component: 'settings/admin-permission/admin-permission',
          icon: 'Document',
          path: '/settings/permissions/permission',
          type: RouteType.MENU,
          name: i18n.permissionSettings,
          permissions: ['permission:pagination', 'permission:getAll'],
          order: 304,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
              permissions: ['permission:create']
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
              permissions: ['permission:update']
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
              permissions: ['permission:delete']
            },
          ],
        },
      ],
    },
    {
      type: RouteType.SMALL_GROUP,
      name: i18n.systemSetting,
      order: 305,
      children: [
        {
          component: 'settings/storage-setting/storage-setting',
          icon: 'Setting',
          path: '/settings/storage-setting',
          type: RouteType.MENU,
          name: i18n.storageSetting,
          permissions: ['storage-setting:pagination', 'storage-setting:getAll'],
          order: 306,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
              permissions: ['storage-setting:create']
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
              permissions: ['storage-setting:update']
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
              permissions: ['storage-setting:delete']
            },
          ],
        },
        {
          name: i18n.dictSettings,
          component: 'settings/dict-type/dict-type',
          icon: 'Notebook',
          path: '/settings/dict-type',
          type: RouteType.MENU,
          permissions: ['dict-type:pagination', 'dict-type:getAll'],
          order: 307,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
              permissions: ['dict-type:create']
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
              permissions: ['dict-type:update']
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
              permissions: ['dict-type:delete']
            },
          ],
        },
        {
          name: i18n.configSettings,
          component: 'settings/config/config-view',
          icon: 'Operation',
          path: '/settings/config',
          type: RouteType.MENU,
          permissions: ['config:pagination'],
          order: 308,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
              permissions: ['config:create']
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
              permissions: ['config:update']
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
              permissions: ['config:delete']
            },
          ],
        },
        {
          component: 'settings/admin-user/admin-user',
          icon: 'User',
          path: '/settings/admin-user',
          type: RouteType.MENU,
          name: i18n.adminUsers,
          permissions: ['admin-user:pagination'],
          order: 309,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
              permissions: ['admin-user:create']
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
              permissions: ['admin-user:update']
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
              permissions: ['admin-user:delete']
            },
          ],
        },
      ],
    },
  ],
} as const
