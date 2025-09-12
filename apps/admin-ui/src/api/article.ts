import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { ref, toValue, type Reactive } from 'vue'
import type { ApiGetData, ApiGetQuery, ApiPatchReqBody, ApiPostReqBody } from '@/types/type-utils'

export type Article = ApiGetData<'/admin/article'>['list'][number]

export type CreateArticleDto = ApiPostReqBody<'/admin/article'>

export type UpdateArticleDto = ApiPatchReqBody<'/admin/article/{id}'>

export type QueryArticleDto = ApiGetQuery<'/admin/article'>

export const useArticleList = (query: Reactive<QueryArticleDto>) => {
  return useQuery({
    queryKey: ['article-list', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/article', {
          params: {
            query
          },
          showMsg: false
        })
      )
    }
  })
}

export const useArticleDetail = () => {
  const articleId = ref<number>(0)
  const query = useQuery({
    queryKey: ['article-detail', articleId],
    enabled: false,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/article/{id}', {
          params: {
            path: {
              id: toValue(articleId)
            }
          },
          showMsg: false
        })
      )
    }
  })

  return {
    articleId,
    query
  }
}

export const useArticleCreate = () => {
  return useMutation({
    mutationKey: ['create-article'],
    mutationFn: (body: CreateArticleDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/article', {
          body
        })
      )
    }
  })
}

export const useArticleUpdate = () => {
  return useMutation({
    mutationKey: ['update-article'],
    mutationFn: ({ id, body }: { id: number; body: UpdateArticleDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/article/{id}', {
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

export const useArticleDelete = () => {
  return useMutation({
    mutationKey: ['delete-article'],
    mutationFn: (id: number) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/article/{id}', {
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
