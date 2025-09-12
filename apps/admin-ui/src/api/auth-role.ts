import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { Ref } from 'vue'
import type { ApiGetData, ApiGetQuery, ApiPatchReqBody, ApiPostReqBody } from '@/types/type-utils'

export type AuthRole = ApiGetData<'/admin/auth-role'>['list'][number]

export type CreateAuthRoleDto = ApiPostReqBody<'/admin/auth-role'>

export type UpdateAuthRoleDto = ApiPatchReqBody<'/admin/auth-role/{id}'>

export type QueryAuthRoleDto = ApiGetQuery<'/admin/auth-role'>

export const useAuthRoleList = (query: Ref<QueryAuthRoleDto>) => {
  return useQuery({
    queryKey: ['auth-role', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-role', {
          params: {
            query: query.value
          },
          showMsg: false
        })
      )
    }
  })
}

export const useAuthRoleAll = () => {
  return useQuery({
    queryKey: ['auth-role-all'],
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-role/all', {
          showMsg: false
        })
      )
    }
  })
}

export const useAuthRoleCreate = () => {
  return useMutation({
    mutationKey: ['create-auth-role'],
    mutationFn: (body: CreateAuthRoleDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/auth-role', {
          body
        })
      )
    }
  })
}

export const useAuthRoleUpdate = () => {
  return useMutation({
    mutationKey: ['update-auth-role'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAuthRoleDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/auth-role/{id}', {
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

export const useAuthRoleDelete = () => {
  return useMutation({
    mutationKey: ['delete-auth-role'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/auth-role/{id}', {
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
