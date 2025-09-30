import { createRouter, createWebHistory } from 'vue-router'
import { inherentRoutes } from './routes'
import { useUserStore } from '@/stores/user'
import { useRouteHistoryStore } from '@/stores/route-history'
import { tField } from '@aiknew/shared-ui-locales'
import { BProgress } from '@bprogress/core'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...inherentRoutes]
})

let navigationType: 'push' | 'replace' = 'push'
const originalPush = router.push
const originalReplace = router.replace
router.push = function (...args) {
  navigationType = 'push'
  return originalPush.apply(this, args)
}
router.replace = function (...args) {
  navigationType = 'replace'
  return originalReplace.apply(this, args)
}

router.beforeEach((to) => {
  BProgress.start()
  const userStore = useUserStore()
  if (!userStore.isLogin && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

router.beforeResolve((to) => {
  if (
    to?.meta?.translations &&
    !inherentRoutes.some((item) => item.path === to.path)
  ) {
    const routeHistoryStore = useRouteHistoryStore()
    routeHistoryStore.addHistory(
      {
        path: to.path,
        meta: {
          name: to.meta.translations ? tField(to.meta.translations, 'routeName') : '',
          icon: to.meta.icon
        }
      },
      navigationType
    )
  }
})

router.afterEach(() => {
  BProgress.done()
})

export default router
