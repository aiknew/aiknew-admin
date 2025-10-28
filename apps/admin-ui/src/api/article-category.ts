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

export type ArticleCategory = ApiGetData<"/admin/article-category/all">[number]

export type CreateArticleCategoryDto = ApiPostReqBody<"/admin/article-category">

export type UpdateArticleCategoryDto =
  ApiPatchReqBody<"/admin/article-category/{id}">

export type QueryArticleCategoryDto = ApiGetQuery<"/admin/article-category/all">

export const useArticleCategoryAll = (
  query?: Reactive<QueryArticleCategoryDto>,
) => {
  return useQuery({
    queryKey: ["get-all-article-category", query],
    placeholderData: keepPreviousData,
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET("/admin/article-category/all", {
          params: {
            query,
          },
          showMsg: false,
        }),
      )
    },
  })
}

export const useArticleCategoryCreate = () => {
  return useMutation({
    mutationKey: ["create-article-category"],
    mutationFn: (body: CreateArticleCategoryDto) => {
      return useApiData(() =>
        fetchClient.POST("/admin/article-category", {
          body,
        }),
      )
    },
  })
}

export const useArticleCategoryUpdate = () => {
  return useMutation({
    mutationKey: ["update-article-category"],
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body: UpdateArticleCategoryDto
    }) => {
      return useApiData(() =>
        fetchClient.PATCH("/admin/article-category/{id}", {
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

export const useArticleCategoryDelete = () => {
  return useMutation({
    mutationKey: ["delete-article-category"],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE("/admin/article-category/{id}", {
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
