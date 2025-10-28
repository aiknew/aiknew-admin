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

export type Config = ApiGetData<"/admin/config">["list"][number]

export type CreateConfigDto = ApiPostReqBody<"/admin/config">

export type UpdateConfigDto = ApiPatchReqBody<"/admin/config/{id}">

export type QueryConfigDto = ApiGetQuery<"/admin/config">

export const useConfigList = (query: Reactive<QueryConfigDto>) => {
  return useQuery({
    queryKey: ["config", query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET("/admin/config", {
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
    mutationKey: ["create-config"],
    mutationFn: (body: CreateConfigDto) => {
      return useApiData(() =>
        fetchClient.POST("/admin/config", {
          body,
        }),
      )
    },
  })
}

export const useConfigUpdate = () => {
  return useMutation({
    mutationKey: ["update-config"],
    mutationFn: ({ id, body }: { id: string; body: UpdateConfigDto }) => {
      return useApiData(() =>
        fetchClient.PATCH("/admin/config/{id}", {
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
    mutationKey: ["delete-config"],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE("/admin/config/{id}", {
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
