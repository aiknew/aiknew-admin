import { useApiData } from '@/composables'
import type { paths } from '@/types/open-api'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import type { Reactive } from 'vue'

export type AdminUser =
  paths['/admin/admin-user']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type CreateAdminUserDto =
  paths['/admin/admin-user']['post']['requestBody']['content']['application/json']

export type UpdateAdminUserDto =
  paths['/admin/admin-user/{id}']['patch']['requestBody']['content']['application/json']

export const useAdminUserList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['admin-user', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/admin-user', {
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
    mutationKey: ['create-admin-user'],
    mutationFn: (body: CreateAdminUserDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/admin-user', {
          body
        })
      )
    }
  })
}

export const useAdminUserUpdate = () => {
  return useMutation({
    mutationKey: ['update-admin-user'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAdminUserDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/admin-user/{id}', {
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
    mutationKey: ['delete-admin-user'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/admin-user/{id}', {
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
