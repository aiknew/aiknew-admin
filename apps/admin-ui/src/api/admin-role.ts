import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import type { Reactive } from 'vue'
import type { paths } from '@/types/open-api'

export type AdminRole =
  paths['/admin/admin-role']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type CreateAdminRoleDto =
  paths['/admin/admin-role']['post']['requestBody']['content']['application/json']

export type UpdateAdminRoleDto =
  paths['/admin/admin-role/{id}']['patch']['requestBody']['content']['application/json']

export const useAdminRoleList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['admin-role', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/admin-role', {
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
    queryKey: ['admin-role-all'],
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/admin-role/all', {
          showMsg: false
        })
      )
    }
  })
}

export const useAdminRoleCreate = () => {
  return useMutation({
    mutationKey: ['create-admin-role'],
    mutationFn: (body: CreateAdminRoleDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/admin-role', {
          body
        })
      )
    }
  })
}

export const useAdminRoleUpdate = () => {
  return useMutation({
    mutationKey: ['update-admin-role'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAdminRoleDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/admin-role/{id}', {
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
    mutationKey: ['delete-admin-role'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/admin-role/{id}', {
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
