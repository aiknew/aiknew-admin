import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { type Reactive } from 'vue'
import type { paths } from '@/types/open-api'

export type FileStorage =
  paths['/admin/file-storage']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type CreateFileStorageDto =
  paths['/admin/file-storage']['post']['requestBody']['content']['application/json']

export type UpdateFileStorageDto =
  paths['/admin/file-storage/{id}']['patch']['requestBody']['content']['application/json']

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
