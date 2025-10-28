import { keepPreviousData, useMutation, useQuery } from "@tanstack/vue-query"
import { useApiData } from "@/composables/use-api"
import { fetchClient } from "@/utils/openapi-fetch-client"
import type {
  ApiGetData,
  ApiGetQuery,
  ApiPatchReqBody,
  ApiPostReqBody,
} from "@/types/type-utils"
import type { Reactive } from "vue"

export type PermissionGroup = ApiGetData<"/admin/permission-group/all">[number]

export type CreatePermissionGroupDto = ApiPostReqBody<"/admin/permission-group">

export type UpdatePermissionGroupDto =
  ApiPatchReqBody<"/admin/permission-group/{id}">

export type QueryPermissionGroupDto = ApiGetQuery<"/admin/permission-group">

export const usePermissionGroupList = (
  query: Reactive<QueryPermissionGroupDto>,
) => {
  return useQuery({
    queryKey: ["permission-group-pagination", query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET("/admin/permission-group", {
          params: {
            query,
          },
          showMsg: false,
        }),
      )
    },
  })
}

export const usePermissionGroupAll = () => {
  return useQuery({
    queryKey: ["permission-group-all"],
    queryFn: async () => {
      return useApiData(() => {
        return fetchClient.GET("/admin/permission-group/all", {
          showMsg: false,
        })
      })
    },
  })
}

export const usePermissionGroupCreate = () => {
  return useMutation({
    mutationKey: ["create-permission-group"],
    mutationFn: (body: CreatePermissionGroupDto) => {
      return useApiData(() =>
        fetchClient.POST("/admin/permission-group", {
          body,
        }),
      )
    },
  })
}

export const usePermissionGroupUpdate = () => {
  return useMutation({
    mutationKey: ["update-permission-group"],
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body: UpdatePermissionGroupDto
    }) => {
      return useApiData(() =>
        fetchClient.PATCH("/admin/permission-group/{id}", {
          params: {
            path: {
              id,
            },
          },
          body,
        }),
      )
    },
  })
}

export const usePermissionGroupDelete = () => {
  return useMutation({
    mutationKey: ["delete-permission-group"],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE("/admin/permission-group/{id}", {
          params: {
            path: {
              id,
            },
          },
        }),
      )
    },
  })
}
