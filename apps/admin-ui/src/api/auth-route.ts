import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { toValue, type MaybeRef, type Reactive, type Ref } from 'vue'
import type { components, paths } from '@/types/open-api'

export type RouteType = components['schemas']['RouteType']

export type AuthRoute =
  paths['/admin/auth-route']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type AuthRouteAncestorsDto =
  paths['/admin/auth-route/ancestors']['get']['responses']['200']['content']['application/json']['data']['list']

export type CreateAuthRouteDto =
  paths['/admin/auth-route']['post']['requestBody']['content']['application/json']

export type UpdateAuthRouteDto =
  paths['/admin/auth-route/{id}']['patch']['requestBody']['content']['application/json']

export const useAdminRouteList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['auth-route', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-route', {
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
    queryKey: ['auth-route-children', id],
    enabled: false,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-route/{id}/children', {
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
    mutationKey: ['delete-auth-route'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/auth-route/{id}', {
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
    queryKey: ['auth-route-ancestors', ids],
    enabled: false,
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-route/ancestors', {
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
    mutationKey: ['create-auth-route'],
    mutationFn: (body: CreateAuthRouteDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/auth-route', {
          body
        })
      )
    }
  })
}

export const useAdminRouteUpdate = () => {
  return useMutation({
    mutationKey: ['update-auth-route'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAuthRouteDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/auth-route/{id}', {
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
