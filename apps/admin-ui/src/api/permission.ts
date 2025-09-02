import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { toValue, type Reactive, type Ref } from 'vue'
import type { ApiGetData, ApiGetQuery, ApiPatchReqBody, ApiPostReqBody } from '@/types/type-utils'

export type Permission = ApiGetData<'/admin/permission'>['permissionList'][number]

export type PermissionGroup = ApiGetData<'/admin/permission'>['groupList'][number]

export type PermissionsAndGroupsDto = ApiGetData<'/admin/permission'>

export type CreatePermissionDto = ApiPostReqBody<'/admin/permission'>

export type UpdatePermissionDto = ApiPatchReqBody<'/admin/permission/{id}'>

export type QueryPermissionDto = ApiGetQuery<'/admin/permission/all'>

export const usePermissionList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['permission', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/permission', {
          params: {
            query
          },
          showMsg: false
        })
      )
    }
  })
}



export const usePermissionAll = (groupId?: Ref<string>) => {
  return useQuery({
    queryKey: ['permission-all', groupId],
    enabled: false,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/permission/all', {
          params: {
            query: {
              groupId: toValue(groupId)
            }
          },
          showMsg: false
        })
      )
    }
  })
}


export const usePermissionCreate = () => {
  return useMutation({
    mutationKey: ['create-permission'],
    mutationFn: (body: CreatePermissionDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/permission', {
          body
        })
      )
    }
  })
}

export const usePermissionUpdate = () => {
  return useMutation({
    mutationKey: ['update-permission'],
    mutationFn: ({ id, body }: { id: string; body: UpdatePermissionDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/permission/{id}', {
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

export const usePermissionDelete = () => {
  return useMutation({
    mutationKey: ['delete-permission'],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/permission/{id}', {
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
