import type { UserInfo } from "@/api/auth"
import { markRaw } from "vue"
import { RouterView, type Router, type RouteRecordRaw } from "vue-router"
import { buildTree } from "@aiknew/shared-utils"
import AdminLayout from "@/components/common/admin-layout.vue"
import { staticRoutes } from "@/router/routes"

export const views = import.meta.glob("@/views/**/*.vue")

export const useRoutes = (router: Router) => {
  const resolveRoutes = (routes: UserInfo["routes"]): RouteRecordRaw[] => {
    const normalizedRoutes = routes.map((route) => {
      const { path, redirect, component, ...meta } = route
      switch (route.type) {
        case "MENU":
          return {
            path,
            meta,
            component: views[`/src/views/${component}.vue`],
          }
        case "GROUP":
          return {
            path,
            redirect,
            meta,
            component: markRaw(RouterView),
            children: [],
          }
        case "SMALL_GROUP":
          return {
            path,
            redirect,
            meta,
            component: markRaw(RouterView),
            children: [],
          }
      }
    })

    return buildTree(normalizedRoutes, "meta.id", "meta.parentId")
  }

  const findFirstMenu = (routes: RouteRecordRaw[]) => {
    for (const route of routes) {
      if (route.meta?.type === "MENU") {
        return route
      } else if (route.children && route.children.length > 0) {
        return findFirstMenu(route.children)
      }
    }
  }

  const addRoutes = (routes: UserInfo["routes"]) => {
    routes.sort((a, b) => a.order - b.order)
    const dynamicRoutes = resolveRoutes(routes)
    const children = [...dynamicRoutes, ...staticRoutes]
    const redirect = findFirstMenu(dynamicRoutes)

    router.addRoute({
      path: "/",
      name: "Index",
      component: AdminLayout,
      redirect,
      children,
    })
  }

  return {
    addRoutes,
  }
}
