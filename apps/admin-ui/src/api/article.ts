import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { ref, toValue, type Reactive } from 'vue'
import type { paths } from '@/types/open-api'

export type Article =
  paths['/admin/article']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type CreateArticleDto =
  paths['/admin/article']['post']['requestBody']['content']['application/json']

export type UpdateArticleDto =
  paths['/admin/article/{id}']['patch']['requestBody']['content']['application/json']

export const useArticleList = (query: Reactive<IPaginationQuery>) => {
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
