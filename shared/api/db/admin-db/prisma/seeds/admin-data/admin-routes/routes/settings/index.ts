import { i18n } from "../../i18n"
import { defineRouteItem, RouteType } from "../../types"
import { permissions } from "./permissions"
import { systemSettings } from "./system-settings"

export const settings = defineRouteItem({
  icon: "Setting",
  path: "/settings",
  redirect: "/settings/admin-user",
  type: RouteType.GROUP,
  name: i18n.settings,
  order: 300,
  children: [permissions, systemSettings],
})
