import { useApiData } from '@/composables'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import type { Reactive } from 'vue'
import type { ApiGetData, ApiPatchReqBody, ApiPostReqBody } from '@/types/type-utils'

export type AuthUser = ApiGetData<'/admin/auth-user'>['list'][number]

export type CreateAuthUserDto = ApiPostReqBody<'/admin/auth-user'>

export type UpdateAuthUserDto = ApiPatchReqBody<'/admin/auth-user/{id}'>

export const useAuthUserList = (query: Reactive<IPaginationQuery>) => {
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

export const useAuthUserCreate = () => {
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

export const useAuthUserUpdate = () => {
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

export const useAuthUserDelete = () => {
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
