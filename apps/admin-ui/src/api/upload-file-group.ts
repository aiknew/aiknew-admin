import { useApiData } from '@/composables'
import type { components } from '@/types/open-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

export type CreateUploadFileGroupDto = components['schemas']['CreateUploadFileGroupDto']

export type UploadFileGroupDto = components['schemas']['UploadFileGroupDto']

export type UpdateUploadFileGroupDto = components['schemas']['UpdateUploadFileGroupDto']

export const useUploadFileGroupCreate = () => {
  return useMutation({
    mutationKey: ['create-upload-file-group'],
    mutationFn: (body: CreateUploadFileGroupDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/upload-file-group', {
          body
        })
      )
    }
  })
}

export const useUploadFileGroupUpdate = () => {
  return useMutation({
    mutationKey: ['update-upload-file'],
    mutationFn: ({ id, body }: { id: string; body: UpdateUploadFileGroupDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/upload-file-group/{id}', {
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

export const useUploadFileGroupDelete = () => {
  return useMutation({
    mutationKey: ['delete-upload-file-group'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/upload-file-group/{id}', {
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

export const useUploadFileGroupChildren = () => {
  const id = ref<string>('')
  const query = useQuery({
    queryKey: ['upload-file-group-children', id],
    enabled: false,
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET('/admin/upload-file-group/{id}', {
          params: {
            path: {
              id: id.value
            }
          },
          showMsg: false
        })
      )
    }
  })

  return {
    id,
    query
  }
}
