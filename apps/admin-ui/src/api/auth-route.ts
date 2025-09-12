import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { ApiGetData, ApiGetQuery, ApiPatchReqBody, ApiPostReqBody } from '@/types/type-utils'
import type { Ref } from 'vue'

export type AuthRoute = ApiGetData<'/admin/auth-route/all'>[number]

export type RouteType = AuthRoute['type']

export type CreateAuthRouteDto = ApiPostReqBody<'/admin/auth-route'>

export type UpdateAuthRouteDto = ApiPatchReqBody<'/admin/auth-route/{id}'>

export type QueryAuthRouteDto = ApiGetQuery<'/admin/auth-route/all'>

export const useAuthRouteAll = (query?: Ref<QueryAuthRouteDto>) => {
  return useQuery({
    queryKey: ['auth-route-all', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/auth-route/all', {
          params: {
            query: query?.value
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
