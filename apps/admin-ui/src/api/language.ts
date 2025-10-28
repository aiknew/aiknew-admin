import { useApiData } from "@/composables"
import { fetchClient } from "@/utils/openapi-fetch-client"
import { useMutation, useQuery } from "@tanstack/vue-query"
import type { Reactive } from "vue"
import type {
  ApiGetData,
  ApiGetQuery,
  ApiPatchReqBody,
  ApiPostReqBody,
} from "@/types/type-utils"

export type LanguageDto = ApiGetData<"/admin/language">["list"][number]

export type CreateLanguageDto = ApiPostReqBody<"/admin/language">

export type UpdateLanguageDto = ApiPatchReqBody<"/admin/language/{key}">

export type QueryLanguageDto = ApiGetQuery<"/admin/language">

export const useEnabledLangList = (enabled = true) => {
  return useQuery({
    queryKey: ["enabled-lang-list"],
    enabled,
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET("/admin/language/enabled", {
          showMsg: false,
        }),
      )
    },
  })
}

export const useLangList = (query: Reactive<QueryLanguageDto>) => {
  return useQuery({
    queryKey: ["lang-list", query],
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET("/admin/language", {
          params: {
            query,
          },

          showMsg: false,
        }),
      )
    },
  })
}

export const useLangCreate = () => {
  return useMutation({
    mutationKey: ["create-lang"],
    mutationFn: (body: CreateLanguageDto) => {
      return useApiData(() =>
        fetchClient.POST("/admin/language", {
          body,
        }),
      )
    },
  })
}

export const useLangUpdate = () => {
  return useMutation({
    mutationKey: ["update-lang"],
    mutationFn: ({ key, body }: { key: string; body: UpdateLanguageDto }) => {
      return useApiData(() =>
        fetchClient.PATCH("/admin/language/{key}", {
          params: {
            path: {
              key,
            },
          },
          body,
        }),
      )
    },
  })
}

export const useLangDelete = () => {
  return useMutation({
    mutationKey: ["delete-lang"],
    mutationFn: (key: string) => {
      return useApiData(() =>
        fetchClient.DELETE("/admin/language/{key}", {
          params: {
            path: {
              key,
            },
          },
        }),
      )
    },
  })
}
