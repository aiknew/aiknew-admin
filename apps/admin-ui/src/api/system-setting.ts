import { useApiData } from '@/composables'
import type { paths } from '@/types/open-api'
import { fetchClient } from '@/utils/openapi-fetch-client'
import { useMutation, useQuery } from '@tanstack/vue-query'

type SystemSettingUpdateBody =
  paths['/admin/system-setting']['put']['requestBody']['content']['application/json']

export const useSystemSettingUpdate = () => {
  return useMutation({
    mutationKey: ['system-setting-update'],
    mutationFn: (body: SystemSettingUpdateBody) => {
      return useApiData(() =>
        fetchClient.PUT('/admin/system-setting', {
          body
        })
      )
    }
  })
}

export const useSystemSettingQuery = (key: keyof SystemSettingUpdateBody) => {
  return useQuery({
    queryKey: ['system-setting-query', key],
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET('/admin/system-setting/{key}', {
          params: {
            path: {
              key
            }
          },
          showMsg: false
        })
      )
    }
  })
}
