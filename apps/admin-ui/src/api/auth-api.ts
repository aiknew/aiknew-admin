import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { toValue, type MaybeRef, type Reactive, type Ref } from 'vue'
import type { paths } from '@/types/open-api'
import type { GetData, PatchReqBody, PostReqBody } from '@aiknew/shared-ui-types'

export type AuthApi = GetData<paths, '/admin/auth-api'>['list'][number]

export type AuthApiAncestorsList = GetData<paths, '/admin/auth-api/ancestors'>['list']

export type CreateAuthApiDto = PostReqBody<paths, '/admin/auth-api'>

export type UpdateAuthApiDto = PatchReqBody<paths, '/admin/auth-api/{id}'>

export const useAuthApiList = (query: Reactive<IPaginationQuery>) => {
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

export const useAuthApiChildren = (id: MaybeRef<string>) => {
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

export const useAuthApiCreate = () => {
  return useMutation({
    mutationKey: ['create-auth-api'],
    mutationFn: (body: CreateAuthApiDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/auth-api', {
          body
        })
      )
    }
  })
}

export const useAuthApiUpdate = () => {
  return useMutation({
    mutationKey: ['update-auth-api'],
    mutationFn: ({ id, body }: { id: string; body: UpdateAuthApiDto }) => {
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

export const useAuthApiDelete = () => {
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

export const useAuthApisAncestors = (ids: Ref<string[]>) => {
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
