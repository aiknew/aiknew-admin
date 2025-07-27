import { useApiData } from '@/composables'
import type { IPaginationQuery } from '@aiknew/shared-types'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { useQuery } from '@tanstack/vue-query'
import type { Reactive } from 'vue'
import type { ApiGetData } from '@/types/type-utils'

export type LanguageData = ApiGetData<'/admin/language'>['list'][number]

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
