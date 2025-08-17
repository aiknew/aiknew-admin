import router from '@/router'
import { tField } from '@aiknew/shared-ui-locales'
import type { RouteHistory } from '@aiknew/shared-ui-types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { isNavigationFailure, NavigationFailureType, type RouteRecordNormalized } from 'vue-router'

export const useRouteHistoryStore = defineStore('route-history', () => {
  const routeHistory = ref<RouteHistory[]>([])

  const _getRedirectedLocation = (
    path: string,
    searchRoutes?: RouteRecordNormalized[]
  ): RouteRecordNormalized | undefined => {
    const routes = searchRoutes ?? router.getRoutes()
    for (let i = 0, len = routes.length; i < len; i++) {
      const route = routes[i]
      if (route.path === path) {
        if (route.redirect) {
          return _getRedirectedLocation(route.redirect as string, routes)
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
                ? tField(redirectedRoute.meta.translations, 'routeName').value
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
        routeHistory.value.pop()
      }
      return routeHistory.value.push(route)
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
