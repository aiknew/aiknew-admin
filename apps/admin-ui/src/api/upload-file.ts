import { useApiData } from '@/composables'
import type { ApiGetData, ApiGetQuery, ApiPatchReqBody } from '@/types/type-utils'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { type Ref } from 'vue'

export type UploadFilesAndGroupsDto = ApiGetData<'/admin/upload-file/filesAndGroups'>

export type UploadFilesAndGroupsQuery = ApiGetQuery<'/admin/upload-file/filesAndGroups'>

export type UpdateUploadFileDto = ApiPatchReqBody<'/admin/upload-file/{id}'>

export type UploadFilePresignedQuery = ApiGetQuery<'/admin/s3/presigned'>

export const uploadFileUrl = '/admin/upload-file'

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
