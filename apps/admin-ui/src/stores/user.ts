import { type LoginSuccessData, type UserInfo } from '@/api/auth'
import { useRoutes } from '@/composables/use-routes'
import router from '@/router'
import { StorageSerializers, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

const { addRoutes } = useRoutes(router)

export const useUserStore = defineStore('user', () => {
  const accessToken = useStorage('accessToken', '')
  const userInfo = useStorage<UserInfo>('userInfo', null, undefined, {
    serializer: StorageSerializers.object
  })

  const isLogin = computed(() => Boolean(accessToken.value.trim()))

  const userName = computed(() => {
    return userInfo.value?.userName
  })

  const registerRoutes = () => {
    if (userInfo.value) {
      addRoutes(userInfo.value.routes.filter((item) => item.type !== 'BUTTON'))
    }
  }

  const login = (data: LoginSuccessData) => {
    accessToken.value = data.access_token
    userInfo.value = data.userInfo

    registerRoutes()

    router.push({ name: 'Index' })
  }

  const logout = () => {
    accessToken.value = ''
    userInfo.value = null

    router.push({ name: 'Login' })
  }

  const checkPermission = (key: string, route?: string) => {
    let routeId: string | undefined

    if (route) {
      routeId = userInfo.value.routes.find((item) => item.path === route)?.id
    } else {
      routeId = router.currentRoute.value.meta.id
    }

    const hasPermission = userInfo.value.routes.some((item) => {
      return item.type === 'BUTTON' && item.parentId === routeId && item.key === key
    })

    return hasPermission
  }

  return {
    accessToken,
    userInfo,
    isLogin,
    userName,
    login,
    logout,
    registerRoutes,
    checkPermission
  }
})
