import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import type { ApiGetData, ApiPatchReqBody, ApiPostReqBody } from '@/types/type-utils'
import type { Reactive, Ref } from 'vue'

export type DictType = ApiGetData<'/admin/dict-type'>['list'][number]

export type CreateDictTypeDto = ApiPostReqBody<'/admin/dict-type'>

export type UpdateDictTypeDto = ApiPatchReqBody<'/admin/dict-type/{id}'>

export const useDictTypeList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['dict-type-list', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/dict-type', {
          params: {
            query
          },
          showMsg: false
        })
      )
    }
  })
}

export const useDictTypeAll = () => {
  return useQuery({
    queryKey: ['dict-type-all'],
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/dict-type/all', {
          showMsg: false
        })
      )
    }
  })
}


export const useDictTypeCreate = () => {
  return useMutation({
    mutationKey: ['create-dict-type'],
    mutationFn: (body: CreateDictTypeDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/dict-type', {
          body
        })
      )
    }
  })
}

export const useDictTypeUpdate = () => {
  return useMutation({
    mutationKey: ['update-dict-type'],
    mutationFn: ({ id, body }: { id: string; body: UpdateDictTypeDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/dict-type/{id}', {
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

export const useDictTypeDelete = () => {
  return useMutation({
    mutationKey: ['delete-dict-type'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/dict-type/{id}', {
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
