import { useApiData } from '@/composables'
import type { paths } from '@/types/open-api'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import type { Reactive } from 'vue'

export type AuthUser =
  paths['/admin/auth-user']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type CreateAuthUserDto =
  paths['/admin/auth-user']['post']['requestBody']['content']['application/json']

export type UpdateAuthUserDto =
  paths['/admin/auth-user/{id}']['patch']['requestBody']['content']['application/json']

export const useAdminUserList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['auth-user', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-user', {
          params: {
            query
          },
          showMsg: false
        })
      )
    }
  })
}

export const useAdminUserCreate = () => {
  return useMutation({
    mutationKey: ['create-auth-user'],
    mutationFn: (body: CreateAuthUserDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/auth-user', {
          body
        })
      )
    }
  })
}

export const useAdminUserUpdate = () => {
  return useMutation({
    mutationKey: ['update-auth-user'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAuthUserDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/auth-user/{id}', {
          params: {
            path: {
              id
            }
          },
          body
        })
      )
    }
  })
}

export const useAdminUserDelete = () => {
  return useMutation({
    mutationKey: ['delete-auth-user'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/auth-user/{id}', {
          params: {
            path: {
              id
            }
          }
        })
      )
    }
  })
}
