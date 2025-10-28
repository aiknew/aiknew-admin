import { i18n } from "../../i18n"
import { defineRouteItem, RouteType } from "../../types"
import { articleManagement } from "./article-management"
import { fileManagement } from "./file-management"

export const contentManagement = defineRouteItem({
  icon: "Collection",
  path: "/content",
  redirect: "/content/file",
  type: RouteType.GROUP,
  name: i18n.contentManagement,
  order: 200,
  children: [fileManagement, articleManagement],
})
