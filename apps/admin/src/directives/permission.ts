import router from '@/router'
import { useUserStore } from '@/stores/user'
import { type Directive } from 'vue'

export const permissionDirective: Directive = {
  mounted(el, { value: routePath, arg: key }) {
    if (key && key.trim()) {
      const userStore = useUserStore()
      let routeId: string | undefined

      if (routePath) {
        routeId = userStore.userInfo?.routes.find((item) => item.path === routePath)?.id
      } else {
        routeId = router.currentRoute.value.meta.id
      }

      const hasPermission = userStore.userInfo?.routes.some((item) => {
        return item.type === 'BUTTON' && item.parentId === routeId && item.key === key
      })

      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    }
  }
}
