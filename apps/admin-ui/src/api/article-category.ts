import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import type { PaginationDto } from '@/types/request'
import { ref, toValue, type MaybeRef, type Reactive, type Ref } from 'vue'
import type { paths } from '@/types/open-api'

export type ArticleCategory =
  paths['/admin/article-category']['get']['responses']['200']['content']['application/json']['data']['list'][number]

export type ArticleCategoryAncestorsList =
  paths['/admin/article-category/ancestors']['get']['responses']['200']['content']['application/json']['data']['list']

export type CreateArticleCategoryDto =
  paths['/admin/article-category']['post']['requestBody']['content']['application/json']

export type UpdateArticleCategoryDto =
  paths['/admin/article-category/{id}']['patch']['requestBody']['content']['application/json']

export const useArticleCategoryList = (query: Reactive<PaginationDto>) => {
  return useQuery({
    queryKey: ['article-category-list', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/article-category', {
          params: {
            query
          },
          showMsg: false
        })
      )
    }
  })
}

export const useArticleCategoryChildren = () => {
  const parentId = ref<number>(0)
  const query = useQuery({
    queryKey: ['article-category-children', parentId],
    enabled: false,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/article-category/{id}/children', {
          params: {
            path: {
              id: toValue(parentId)
            }
          },
          showMsg: false
        })
      )
    }
  })

  return {
    parentId,
    query
  }
}

export const useArticleCategoryCreate = () => {
  return useMutation({
    mutationKey: ['create-article-category'],
    mutationFn: (body: CreateArticleCategoryDto) => {
      return useApiData(() =>
        fetchClient.POST('/admin/article-category', {
          body
        })
      )
    }
  })
}

export const useArticleCategoryUpdate = () => {
  return useMutation({
    mutationKey: ['update-article-category'],
    mutationFn: ({ id, body }: { id: number; body: UpdateArticleCategoryDto }) => {
      return useApiData(() =>
        fetchClient.PATCH('/admin/article-category/{id}', {
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

export const useArticleCategoryDelete = () => {
  return useMutation({
    mutationKey: ['delete-article-category'],
    mutationFn: (id: number) => {
      return useApiData(() =>
        fetchClient.DELETE('/admin/article-category/{id}', {
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

export const useArticleCategoryAncestors = (ids: Ref<number[]>) => {
  return useQuery({
    queryKey: ['article-category-ancestors', ids],
    enabled: false,
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET('/admin/article-category/ancestors', {
          params: {
            query: {
              ids: ids.value
            }
          },
          showMsg: false
        })
      )
    }
  })
}
