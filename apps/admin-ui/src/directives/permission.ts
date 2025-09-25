import { useUserStore } from '@/stores/user'
import { type Directive } from 'vue'

export const permissionDirective: Directive = {
  mounted(el, { value: routePath, arg: key }) {
    if (key && key.trim()) {
      const { checkPermission } = useUserStore()
      const hasPermission = checkPermission(key, routePath)

      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    }
  }
}
