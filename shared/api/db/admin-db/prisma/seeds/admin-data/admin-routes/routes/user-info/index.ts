import { defineRouteItem, RouteType } from "../../types"
import { i18n } from "../../i18n"

export const userInfo = defineRouteItem({
  component: "settings/user-info/user-info",
  hidden: true,
  path: "/account-info",
  type: RouteType.MENU,
  name: i18n.updateAccountInfo,
  order: 500,
  children: [
    {
      key: "update",
      type: RouteType.BUTTON,
      name: i18n.update,
    },
  ],
})
