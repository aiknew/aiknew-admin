import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { type IPaginationQuery } from '@aiknew/shared-types'
import { type Reactive } from 'vue'
import type { ApiGetData, ApiGetQuery, ApiPatchReqBody, ApiPostReqBody } from '@/types/type-utils'

export type FileStorage = ApiGetData<'/admin/file-storage'>['list'][number]

export type CreateFileStorageDto = ApiPostReqBody<'/admin/file-storage'>

export type UpdateFileStorageDto = ApiPatchReqBody<'/admin/file-storage/{id}'>

export type QueryFileStorageDto = ApiGetQuery<'/admin/file-storage'>

export const useFileStorageAll = () => {
  return useQuery({
    queryKey: ['file-storage-all'],
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/file-storage/all', {
          showMsg: false
        })
      )
    }
  })
}

export const useFileStorageList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['file-storage-list', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/file-storage', {
          params: {
            query
          },
          showMsg: false
        })
      )
    }
  })
}

export const useFileStorageCreate = () => {
  return useMutation({
    mutationKey: ['create-file-storage'],
    mutationFn: (body: CreateFileStorageDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/file-storage', {
          body
        })
      )
    }
  })
}

export const useFileStorageUpdate = () => {
  return useMutation({
    mutationKey: ['update-file-storage'],
    mutationFn: ({ id, body }: { id: string; body: UpdateFileStorageDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/file-storage/{id}', {
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

export const useFileStorageDelete = () => {
  return useMutation({
    mutationKey: ['delete-file-storage'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/file-storage/{id}', {
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
