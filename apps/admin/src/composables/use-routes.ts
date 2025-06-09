import type { UserInfo } from '@/api/admin-auth'
import { markRaw } from 'vue'
import { RouterView, type Router, type RouteRecordRaw } from 'vue-router'
import { buildTree } from '@aiknew/utils'

export const views = import.meta.glob('@/views/**/*.vue')

export const useRoutes = (router: Router) => {
  const resolveRoutes = (routes: UserInfo['routes']): RouteRecordRaw[] => {
    const normalizedRoutes = routes.map((route) => {
      const { path, redirect, component, ...meta } = route
      switch (route.type) {
        case 'MENU':
          return {
            path,
            meta,
            component: views[`/src/views/${component}.vue`]
          }
        case 'GROUP':
          return {
            path,
            redirect,
            meta,
            component: markRaw(RouterView),
            children: []
          }
        case 'SMALL_GROUP':
          return {
            path,
            redirect,
            meta,
            component: markRaw(RouterView),
            children: []
          }
      }
    })

    return buildTree(normalizedRoutes, 'meta.id', 'meta.parentId')
  }

  const addRoutes = (routes: UserInfo['routes']) => {
    const children = resolveRoutes(routes)

    router.addRoute({
      path: '/',
      name: 'Index',
      component: () => import('../components/layout/app-basic-layout.vue'),
      redirect: children[0].path,
      children
    })
  }

  return {
    addRoutes
  }
}
