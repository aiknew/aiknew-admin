import { type LoginSuccessData, type UserInfo } from '@/api/admin-auth'
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

  const isLogin = computed(() => Boolean(accessToken))

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

  return {
    accessToken,
    userInfo,
    isLogin,
    userName,
    login,
    logout,
    registerRoutes
  }
})
