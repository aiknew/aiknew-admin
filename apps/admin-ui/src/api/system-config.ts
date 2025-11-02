import { keepPreviousData, useMutation, useQuery } from "@tanstack/vue-query"
import { useApiData } from "@/composables/use-api"
import { fetchClient } from "@/utils/openapi-fetch-client"
import { toValue, type Reactive } from "vue"
import type {
  ApiGetData,
  ApiPatchReqBody,
  ApiPostReqBody,
  ApiGetQuery,
} from "@/types/type-utils"

export type SystemConfig = ApiGetData<"/admin/system-config">["list"][number]

export type CreateSystemConfigDto = ApiPostReqBody<"/admin/system-config">

export type UpdateSystemConfigDto = ApiPatchReqBody<"/admin/system-config/{id}">

export type QuerySystemConfigDto = ApiGetQuery<"/admin/system-config">

export const useConfigList = (query: Reactive<QuerySystemConfigDto>) => {
  return useQuery({
    queryKey: ["system-config", query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET("/admin/system-config", {
          params: {
            query: toValue(query),
          },
          showMsg: false,
        }),
      )
    },
  })
}

export const useConfigCreate = () => {
  return useMutation({
    mutationKey: ["create-system-config"],
    mutationFn: (body: CreateSystemConfigDto) => {
      return useApiData(() =>
        fetchClient.POST("/admin/system-config", {
          body,
        }),
      )
    },
  })
}

export const useConfigUpdate = () => {
  return useMutation({
    mutationKey: ["update-system-config"],
    mutationFn: ({ id, body }: { id: string; body: UpdateSystemConfigDto }) => {
      return useApiData(() =>
        fetchClient.PATCH("/admin/system-config/{id}", {
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

export const useConfigDelete = () => {
  return useMutation({
    mutationKey: ["delete-system-config"],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE("/admin/system-config/{id}", {
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
