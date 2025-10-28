import { t } from "@aiknew/shared-ui-locales"
import type { IResponseJson } from "@aiknew/shared-types"
import { isResponseJson } from "@aiknew/shared-ui-utils"
import { HttpError } from "@/utils/openapi-fetch-client"
import { ElMessage } from "element-plus"

type ApiFn<Data extends IResponseJson> = () => Promise<{
  data?: Data
  error?: Record<string, unknown> | string
  response: Response
}>

export const useApi = <Data extends IResponseJson>(apiFn: ApiFn<Data>) => {
  return apiFn().then(({ data, error }) => {
    if (!data || error) {
      let errJson: IResponseJson = {
        code: -1,
        data: {},
        msg: t("requestError"),
      }

      if (typeof error === "string") {
        errJson.msg = error
      } else if (isResponseJson(error)) {
        errJson = error
      } else {
        errJson.data = error ?? {}
      }

      ElMessage({
        type: "error",
        message: errJson.msg,
      })
      throw new HttpError(errJson)
    }

    return data
  })
}

export const useApiData = async <Data extends IResponseJson>(
  apiFn: ApiFn<Data>,
) => {
  return useApi(apiFn).then((res) => res.data as Data["data"])
}
