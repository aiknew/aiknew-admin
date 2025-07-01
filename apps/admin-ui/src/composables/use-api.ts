import { t } from '@/locales'
import type { ResponseJson } from '@/types/request'
import { isResponseJson } from '@aiknew/shared-ui-utils'
import { HttpError } from '@/utils/openapi-fetch-client'
import { ElMessage } from 'element-plus'

type ApiFn<Data extends ResponseJson> = () => Promise<{
  data?: Data
  error?: Record<string, unknown> | string
  response: Response
}>

export const useApi = <Data extends ResponseJson>(apiFn: ApiFn<Data>) => {
  return apiFn().then(({ data, error }) => {
    if (!data || error) {
      let errJson: ResponseJson = {
        code: -1,
        data: {},
        msg: t('requestError')
      }

      if (typeof error === 'string') {
        errJson.msg = error
      } else if (isResponseJson(error)) {
        errJson = error
      } else {
        errJson.data = error ?? {}
      }

      ElMessage({
        type: 'error',
        message: errJson.msg
      })
      throw new HttpError(errJson)
    }

    return data
  })
}

export const useApiData = async <Data extends ResponseJson>(apiFn: ApiFn<Data>) => {
  return useApi(apiFn).then((res) => res.data as Data['data'])
}
