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

export type Dict = ApiGetData<"/admin/dict">["list"][number]

export type QueryDictDto = ApiGetQuery<"/admin/dict">

export type CreateDictDto = ApiPostReqBody<"/admin/dict">

export type UpdateDictDto = ApiPatchReqBody<"/admin/dict/{id}">

export const useDictList = (query: Reactive<QueryDictDto>) => {
  return useQuery({
    queryKey: ["dict-list", query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET("/admin/dict", {
          params: {
            query,
          },
          showMsg: false,
        }),
      )
    },
  })
}

export const useDictCreate = () => {
  return useMutation({
    mutationKey: ["create-dict"],
    mutationFn: (body: CreateDictDto) => {
      return useApiData(() =>
        fetchClient.POST("/admin/dict", {
          body,
        }),
      )
    },
  })
}

export const useDictUpdate = () => {
  return useMutation({
    mutationKey: ["update-dict"],
    mutationFn: ({ id, body }: { id: string; body: UpdateDictDto }) => {
      return useApiData(() =>
        fetchClient.PATCH("/admin/dict/{id}", {
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

export const useDictDelete = () => {
  return useMutation({
    mutationKey: ["delete-dict"],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE("/admin/dict/{id}", {
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
