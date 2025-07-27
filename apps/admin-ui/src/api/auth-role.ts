import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import type { Reactive } from 'vue'
import type { paths } from '@/types/open-api'
import type { GetData, PatchReqBody, PostReqBody } from '@aiknew/shared-ui-types'

export type AuthRole = GetData<paths, '/admin/auth-role'>['list'][number]

export type CreateAuthRoleDto = PostReqBody<paths, '/admin/auth-role'>

export type UpdateAuthRoleDto = PatchReqBody<paths, '/admin/auth-role/{id}'>

export const useAuthRoleList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['auth-role', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-role', {
          params: {
            query
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
