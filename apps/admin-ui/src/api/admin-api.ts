import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { toValue, type MaybeRef, type Reactive, type Ref } from 'vue'
import type { paths } from '@/types/open-api'

export type AdminApi =
  paths['/admin/admin-api']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type AdminApiAncestorsList =
  paths['/admin/admin-api/ancestors']['get']['responses']['200']['content']['application/json']['data']['list']

export type CreateAdminApiDto =
  paths['/admin/admin-api']['post']['requestBody']['content']['application/json']

export type UpdateAdminApiDto =
  paths['/admin/admin-api/{id}']['patch']['requestBody']['content']['application/json']

export const useAdminApiList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['admin-api', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/admin-api', {
          params: {
            query
          },
          showMsg: false
        })
      )
    }
  })
}

export const useAdminApiChildren = (id: MaybeRef<string>) => {
  return useQuery({
    queryKey: ['admin-api-children', id],
    enabled: false,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/admin-api/{id}/children', {
          params: {
            path: {
              id: toValue(id)
            }
          },
          showMsg: false
        })
      )
    }
  })
}

export const useAdminApiCreate = () => {
  return useMutation({
    mutationKey: ['create-admin-api'],
    mutationFn: (body: CreateAdminApiDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/admin-api', {
          body
        })
      )
    }
  })
}

export const useAdminApiUpdate = () => {
  return useMutation({
    mutationKey: ['update-admin-api'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAdminApiDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/admin-api/{id}', {
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

export const useAdminApiDelete = () => {
  return useMutation({
    mutationKey: ['delete-admin-api'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/admin-api/{id}', {
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

export const useAdminApisAncestors = (ids: Ref<string[]>) => {
  return useQuery({
    queryKey: ['admin-apis-ancestors', ids],
    enabled: false,
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET('/admin/admin-api/ancestors', {
          params: {
            query: {
              ids: ids.value
            }
          },
          showMsg: false
        })
      )
    }
  })
}
