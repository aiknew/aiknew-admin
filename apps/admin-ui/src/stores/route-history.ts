import router from '@/router'
import { tField } from '@aiknew/shared-ui-locales'
import type { RouteHistory } from '@aiknew/shared-ui-types'
import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { isNavigationFailure, NavigationFailureType, type RouteRecordNormalized } from 'vue-router'

export const useRouteHistoryStore = defineStore('route-history', () => {
  const routeHistory = shallowRef<RouteHistory[]>([])

  const _getRedirectedLocation = (
    path: string,
    searchRoutes?: RouteRecordNormalized[]
  ): RouteRecordNormalized | undefined => {
    const routes = searchRoutes ?? router.getRoutes()
    for (let i = 0, len = routes.length; i < len; i++) {
      const route = routes[i]
      if (route.path === path) {

        if (typeof route.redirect === 'string') {
          return _getRedirectedLocation(route.redirect, routes)
        }

        if (typeof route.redirect === 'object') {
          return route.redirect as RouteRecordNormalized
        }

        return route
      }
    }
  }

  const _redirectToHome = () => {
    router.push('/').then((failure) => {
      if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
        // get the final redirected path of '/'
        const redirectedRoute = _getRedirectedLocation('/')
        if (redirectedRoute?.path && redirectedRoute?.meta?.translations) {
          addHistory({
            path: redirectedRoute.path,
            meta: {
              name: redirectedRoute.meta.translations
                ? tField(redirectedRoute.meta.translations, 'routeName')
                : '',
              icon: redirectedRoute.meta.icon
            }
          })
        }
      }
    })
  }

  const addHistory = (route: RouteHistory, type: 'push' | 'replace' = 'push') => {
    const exists = routeHistory.value.some((item) => route.path === item.path)
    if (!exists) {
      if (type === 'replace') {
        // delete last route from the route history
        routeHistory.value = routeHistory.value.slice(0, routeHistory.value.length - 2)
      }

      routeHistory.value = [...routeHistory.value, route]
    }
  }

  const removeHistory = (routePath: string) => {
    routeHistory.value = routeHistory.value.filter((item) => item.path !== routePath)
    if (routeHistory.value.length) {
      router.push(routeHistory.value[routeHistory.value.length - 1])
    } else {
      _redirectToHome()
    }
  }

  return {
    routeHistory,
    addHistory,
    removeHistory
  }
})
