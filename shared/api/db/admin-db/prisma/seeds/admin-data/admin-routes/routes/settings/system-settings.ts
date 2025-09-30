import { i18n } from "../../i18n";
import { defineRouteItem, RouteType } from "../../types";

export const systemSettings = defineRouteItem({
  type: RouteType.SMALL_GROUP,
  name: i18n.systemSetting,
  order: 305,
  children: [
    {
      component: 'settings/language/language-view',
      icon: 'ChromeFilled',
      path: '/settings/language',
      type: RouteType.MENU,
      name: i18n.langSetting,
      permissions: ['language:pagination'],
      order: 306,
      children: [
        {
          key: 'add',
          type: RouteType.BUTTON,
          name: i18n.new,
          permissions: ['language:create']
        },
        {
          key: 'edit',
          type: RouteType.BUTTON,
          name: i18n.edit,
          permissions: ['language:update']
        },
        {
          key: 'delete',
          type: RouteType.BUTTON,
          name: i18n.delete,
          permissions: ['language:delete']
        },
      ],
    },
    {
      component: 'settings/storage-setting/storage-setting',
      icon: 'Setting',
      path: '/settings/storage-setting',
      type: RouteType.MENU,
      name: i18n.storageSetting,
      permissions: ['file-storage:pagination', 'file-storage:getAll'],
      order: 310,
      children: [
        {
          key: 'add',
          type: RouteType.BUTTON,
          name: i18n.new,
          permissions: ['file-storage:create']
        },
        {
          key: 'edit',
          type: RouteType.BUTTON,
          name: i18n.edit,
          permissions: ['file-storage:update']
        },
        {
          key: 'delete',
          type: RouteType.BUTTON,
          name: i18n.delete,
          permissions: ['file-storage:delete']
        },
      ],
    },
    {
      name: i18n.dictSettings,
      component: 'settings/dict-type/dict-type',
      icon: 'Notebook',
      path: '/settings/dict-type',
      type: RouteType.MENU,
      permissions: ['dict-type:pagination', 'dict-type:getAll', 'dict:pagination'],
      order: 320,
      children: [
        {
          key: 'add',
          type: RouteType.BUTTON,
          name: i18n.new,
          permissions: ['dict-type:create', 'dict:create']
        },
        {
          key: 'edit',
          type: RouteType.BUTTON,
          name: i18n.edit,
          permissions: ['dict-type:update', 'dict:update']
        },
        {
          key: 'delete',
          type: RouteType.BUTTON,
          name: i18n.delete,
          permissions: ['dict-type:delete', 'dict:delete']
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
      order: 330,
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
      order: 340,
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


    {
      component: 'settings/login-log/login-log',
      icon: 'DataLine',
      path: '/settings/login-log',
      type: RouteType.MENU,
      name: i18n.loginLog,
      permissions: ['login-log:pagination'],
      order: 350,
    },
  ],
})