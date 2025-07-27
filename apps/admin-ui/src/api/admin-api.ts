import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { toValue, type MaybeRef, type Reactive, type Ref } from 'vue'
import type { paths } from '@/types/open-api'

export type AdminApi =
  paths['/admin/auth-api']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type AdminApiAncestorsList =
  paths['/admin/auth-api/ancestors']['get']['responses']['200']['content']['application/json']['data']['list']

export type CreateAdminApiDto =
  paths['/admin/auth-api']['post']['requestBody']['content']['application/json']

export type UpdateAdminApiDto =
  paths['/admin/auth-api/{id}']['patch']['requestBody']['content']['application/json']

export const useAdminApiList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['auth-api', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-api', {
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
    queryKey: ['auth-api-children', id],
    enabled: false,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-api/{id}/children', {
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
    mutationKey: ['create-auth-api'],
    mutationFn: (body: CreateAdminApiDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/auth-api', {
          body
        })
      )
    }
  })
}

export const useAdminApiUpdate = () => {
  return useMutation({
    mutationKey: ['update-auth-api'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAdminApiDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/auth-api/{id}', {
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
    mutationKey: ['delete-auth-api'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/auth-api/{id}', {
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
    queryKey: ['auth-apis-ancestors', ids],
    enabled: false,
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-api/ancestors', {
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
