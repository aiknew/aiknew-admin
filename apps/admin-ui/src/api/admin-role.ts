import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import type { Reactive } from 'vue'
import type { paths } from '@/types/open-api'

export type AdminRole =
  paths['/admin/auth-role']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type CreateAdminRoleDto =
  paths['/admin/auth-role']['post']['requestBody']['content']['application/json']

export type UpdateAdminRoleDto =
  paths['/admin/auth-role/{id}']['patch']['requestBody']['content']['application/json']

export const useAdminRoleList = (query: Reactive<IPaginationQuery>) => {
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

export const useAdminRoleAll = () => {
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

export const useAdminRoleCreate = () => {
  return useMutation({
    mutationKey: ['create-auth-role'],
    mutationFn: (body: CreateAdminRoleDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/auth-role', {
          body
        })
      )
    }
  })
}

export const useAdminRoleUpdate = () => {
  return useMutation({
    mutationKey: ['update-auth-role'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAdminRoleDto }) => {
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

export const useAdminRoleDelete = () => {
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
