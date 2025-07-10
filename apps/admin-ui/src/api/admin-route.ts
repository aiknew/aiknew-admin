import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { toValue, type MaybeRef, type Reactive, type Ref } from 'vue'
import type { components, paths } from '@/types/open-api'

export type RouteType = components['schemas']['RouteType']

export type AdminRoute =
  paths['/admin/admin-route']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type AdminRouteAncestorsDto =
  paths['/admin/admin-route/ancestors']['get']['responses']['200']['content']['application/json']['data']['list']

export type CreateAdminRouteDto =
  paths['/admin/admin-route']['post']['requestBody']['content']['application/json']

export type UpdateAdminRouteDto =
  paths['/admin/admin-route/{id}']['patch']['requestBody']['content']['application/json']

export const useAdminRouteList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['admin-route', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/admin-route', {
          params: {
            query
          },
          showMsg: false
        })
      )
    }
  })
}

export const useAdminRouteChildren = (id: MaybeRef<string>) => {
  return useQuery({
    queryKey: ['admin-route-children', id],
    enabled: false,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/admin-route/{id}/children', {
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

export const useAdminRouteDelete = () => {
  return useMutation({
    mutationKey: ['delete-admin-route'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/admin-route/{id}', {
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

export const useAdminRouteAncestors = (ids: Ref<string[]>) => {
  return useQuery({
    queryKey: ['admin-route-ancestors', ids],
    enabled: false,
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET('/admin/admin-route/ancestors', {
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

export const useAdminRouteCreate = () => {
  return useMutation({
    mutationKey: ['create-admin-route'],
    mutationFn: (body: CreateAdminRouteDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/admin-route', {
          body
        })
      )
    }
  })
}

export const useAdminRouteUpdate = () => {
  return useMutation({
    mutationKey: ['update-admin-route'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAdminRouteDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/admin-route/{id}', {
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
