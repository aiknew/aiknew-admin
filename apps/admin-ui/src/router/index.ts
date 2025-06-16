import { createRouter, createWebHistory } from 'vue-router'
import { inherentRoutes } from './routes'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...inherentRoutes]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.isLogin && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

export default router
