import { useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { paths } from '@/types/open-api'

export type LoginBody =
  paths['/admin/auth/login']['post']['requestBody']['content']['application/json']
export type LoginSuccessData =
  paths['/admin/auth/login']['post']['responses']['201']['content']['application/json']['data']

export type UpdateUserInfo =
  paths['/admin/auth/update']['patch']['requestBody']['content']['application/json']

export type UserInfo = LoginSuccessData['userInfo']

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async (body: LoginBody) => {
      return useApiData(() =>
        fetchClient.POST('/admin/auth/login', {
          body
        })
      )
    }
  })
}

export const useLoginCaptcha = () => {
  return useQuery({
    queryKey: ['login-captcha'],
    queryFn: async () => {
      return await useApiData(() =>
        fetchClient.GET('/admin/auth/captcha', {
          showMsg: false
        })
      )
    }
  })
}

export const useUserInfoUpdate = () => {
  return useMutation({
    mutationKey: ['user-update'],
    mutationFn: async (body: UpdateUserInfo) => {
      return await useApiData(() =>
        fetchClient.PATCH('/admin/auth/update', {
          body
        })
      )
    }
  })
}
