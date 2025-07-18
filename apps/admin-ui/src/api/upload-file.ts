import { useApiData } from '@/composables'
import type { components, paths } from '@/types/open-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { computed, ref, type Reactive, type Ref } from 'vue'

export type UploadFilesAndGroupsDto = components['schemas']['UploadFilesAndGroupsDto']

export type UploadFilesAndGroupsQuery =
  paths['/admin/upload-file/filesAndGroups']['get']['parameters']['query']

export type CreateUploadFileDto = components['schemas']['UploadFileDto']

export type UpdateUploadFileDto = components['schemas']['UpdateUploadFileDto']

export type UploadFilePresignedQuery = paths['/admin/s3/presigned']['get']['parameters']['query']

export const uploadFileUrl = '/admin/upload-file'

export const useUploadFileCreate = () => {
  return useMutation({
    mutationKey: ['create-upload-file'],
    mutationFn: (body: CreateUploadFileDto) => {
      return useApiData(() =>
        fetchClient.POST(uploadFileUrl, {
          body
        })
      )
    }
  })
}

export const useUploadFileUpdate = () => {
  return useMutation({
    mutationKey: ['update-upload-file'],
    mutationFn: ({ id, body }: { id: string; body: UpdateUploadFileDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/upload-file/{id}', {
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

export const useUploadFileDelete = () => {
  return useMutation({
    mutationKey: ['delete-upload-file'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/upload-file/{id}', {
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

export const useUploadFilesAndGroups = (query: Ref<UploadFilesAndGroupsQuery | undefined>) => {
  return useQuery({
    queryKey: ['upload-files-and-groups', query],
    enabled: !!query.value,
    queryFn: () => {
      if (query.value) {
        const api = fetchClient.GET('/admin/upload-file/filesAndGroups', {
          params: {
            query: query.value
          },
          showMsg: false
        })

        return useApiData(() => api)
      }
    }
  })
}

export const useUploadFilePresigned = (query: Ref<UploadFilePresignedQuery | undefined>) => {
  return useQuery({
    queryKey: ['upload-file-presigned'],
    enabled: false,
    queryFn: () => {
      if (query.value) {
        const api = fetchClient.GET('/admin/s3/presigned', {
          params: {
            query: query.value
          },
          showMsg: false
        })

        return useApiData(() => api)
      }
    }
  })
}
