import { i18n } from "../../i18n"
import { defineRouteItem, RouteType } from "../../types"

export const permissions = defineRouteItem({
  path: "/settings/permission",
  type: RouteType.SMALL_GROUP,
  name: i18n.permissionSettings,
  order: 301,
  children: [
    {
      component: "settings/auth-role/auth-role",
      icon: "Avatar",
      path: "/settings/permissions/admin-role",
      type: RouteType.MENU,
      name: i18n.characterSettings,
      permissions: [
        "auth-role:pagination",
        "auth-role:getAll",
        "auth-route:getChildren",
      ],
      order: 302,
      children: [
        {
          key: "add",
          type: RouteType.BUTTON,
          name: i18n.new,
          permissions: ["auth-role:create"],
        },
        {
          key: "edit",
          type: RouteType.BUTTON,
          name: i18n.edit,
          permissions: ["auth-role:update"],
        },
        {
          key: "delete",
          type: RouteType.BUTTON,
          name: i18n.delete,
          permissions: ["auth-role:delete"],
        },
      ],
    },
    {
      component: "settings/auth-route/auth-route",
      icon: "Operation",
      path: "/settings/permissions/admin-route",
      type: RouteType.MENU,
      name: i18n.menuSettings,
      permissions: ["auth-route:getAll"],
      order: 303,
      children: [
        {
          key: "add",
          type: RouteType.BUTTON,
          name: i18n.new,
          permissions: ["auth-route:create"],
        },
        {
          key: "edit",
          type: RouteType.BUTTON,
          name: i18n.edit,
          permissions: ["auth-route:update"],
        },
        {
          key: "delete",
          type: RouteType.BUTTON,
          name: i18n.delete,
          permissions: ["auth-route:delete"],
        },
      ],
    },
    {
      component: "settings/admin-permission/admin-permission",
      icon: "Document",
      path: "/settings/permissions/permission",
      type: RouteType.MENU,
      name: i18n.permissionSettings,
      permissions: [
        "permission:pagination",
        "permissionGroup:pagination",
        "permission:getAll",
        "permissionGroup:getAll",
      ],
      order: 304,
      children: [
        {
          key: "add",
          type: RouteType.BUTTON,
          name: i18n.new,
          permissions: ["permission:create", "permissionGroup:create"],
        },
        {
          key: "edit",
          type: RouteType.BUTTON,
          name: i18n.edit,
          permissions: ["permission:update", "permissionGroup:update"],
        },
        {
          key: "delete",
          type: RouteType.BUTTON,
          name: i18n.delete,
          permissions: ["permission:delete", "permissionGroup:delete"],
        },
      ],
    },

    {
      component: "settings/admin-user/admin-user",
      icon: "User",
      path: "/settings/admin-user",
      type: RouteType.MENU,
      name: i18n.adminUsers,
      permissions: ["admin-user:pagination"],
      order: 305,
      children: [
        {
          key: "add",
          type: RouteType.BUTTON,
          name: i18n.new,
          permissions: ["admin-user:create"],
        },
        {
          key: "edit",
          type: RouteType.BUTTON,
          name: i18n.edit,
          permissions: ["admin-user:update"],
        },
        {
          key: "delete",
          type: RouteType.BUTTON,
          name: i18n.delete,
          permissions: ["admin-user:delete"],
        },
      ],
    },
  ],
})
