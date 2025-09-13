import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { useApiData } from '@/composables/use-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { toValue, type Reactive } from 'vue'
import type { ApiGetData, ApiGetQuery } from '@/types/type-utils'

export type LoginLogDto = ApiGetData<'/admin/login-log'>['list'][number]

export type QueryLoginLogDto = ApiGetQuery<'/admin/login-log'>

export const useLoginLogList = (query: Reactive<QueryLoginLogDto>) => {
  return useQuery({
    queryKey: ['login-log', query],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET('/admin/login-log', {
          params: {
            query: toValue(query)
          },
          showMsg: false
        })
      )
    }
  })
}
