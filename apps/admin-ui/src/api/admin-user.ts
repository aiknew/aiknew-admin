import { useApiData } from '@/composables'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import type { Reactive } from 'vue'
import type { ApiGetData, ApiGetQuery, ApiPatchReqBody, ApiPostReqBody } from '@/types/type-utils'

export type AdminUser = ApiGetData<'/admin/admin-user'>['list'][number]

export type CreateAdminUserDto = ApiPostReqBody<'/admin/admin-user'>

export type UpdateAdminUserDto = ApiPatchReqBody<'/admin/admin-user/{id}'>

export type QueryAdminUserDto = ApiGetQuery<'/admin/admin-user'>

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
