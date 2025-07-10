import { useApiData } from '@/composables'
import type { components } from '@/types/open-api'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { useQuery } from '@tanstack/vue-query'
import type { Reactive } from 'vue'

export type LanguageData = components['schemas']['LanguageItemDto']

export const useEnabledLangList = () => {
  return useQuery({
    queryKey: ['enabled-lang-list'],
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET('/admin/language/enabled', {
          showMsg: false
        })
      )
    }
  })
}

export const useLangList = (query: Reactive<IPaginationQuery>) => {
  return useQuery({
    queryKey: ['lang-list'],
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET('/admin/language', {
          params: {
            query
          },

          showMsg: false
        })
      )
    }
  })
}
