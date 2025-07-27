import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { toValue, type MaybeRef, type Reactive, type Ref } from 'vue'
import type { ApiGetData, ApiPatchReqBody, ApiPostReqBody } from '@/types/type-utils'

export type AuthRoute = ApiGetData<'/admin/auth-route'>['list'][number]

export type RouteType = AuthRoute['type']

export type AuthRouteAncestorsDto = ApiGetData<'/admin/auth-route/ancestors'>['list']

export type CreateAuthRouteDto = ApiPostReqBody<'/admin/auth-route'>

export type UpdateAuthRouteDto = ApiPatchReqBody<'/admin/auth-route/{id}'>

export const useAuthRouteList = (query: Reactive<IPaginationQuery>) => {
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

export const useAuthRouteChildren = (id: MaybeRef<string>) => {
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

export const useAuthRouteDelete = () => {
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

export const useAuthRouteAncestors = (ids: Ref<string[]>) => {
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

export const useAuthRouteCreate = () => {
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

export const useAuthRouteUpdate = () => {
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
