import { type ResponseJson } from "@aiknew/shared-api-dtos"
import { ResponseStatusCode } from "@aiknew/shared-api-enums"
import { SuccessResponse } from "@aiknew/shared-api-utils"

type ResponseParams = {
  method: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE") | (string & {})
  data: Record<string, unknown>
  msg?: string
  code?: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode]
  raw?: boolean
}

export function ConstructSuccessResponse({
  data,
  method,
  code,
  msg,
  raw,
}: ResponseParams & { raw?: false }): ResponseJson
export function ConstructSuccessResponse({
  data,
  method,
  code,
  msg,
  raw,
}: ResponseParams & { raw: true }): unknown
export function ConstructSuccessResponse({
  data,
  method,
  code,
  msg,
  raw,
}: ResponseParams) {
  if (!msg) {
    switch (method) {
      case "POST":
        msg = global.i18nService.translate("common.postSuccess")
        break
      case "PATCH":
        msg = global.i18nService.translate("common.patchSuccess")
        break
      case "DELETE":
        msg = global.i18nService.translate("common.deleteSuccess")
        break
      default:
        msg = global.i18nService.translate("common.requestSuccess")
    }
  }

  const sr = new SuccessResponse()
    .setMsg(global.i18nService.translate(msg ?? "success"))
    .setData(data)
    .setCode(code ?? ResponseStatusCode.COMMON_SUCCESS)

  if (raw) {
    return sr.getResponseRaw()
  }

  return sr.getResponseJson()
}

export const GetSuccessResponse = ({
  data,
  code,
  msg,
}: Omit<ResponseParams, "method">) => {
  return ConstructSuccessResponse({
    method: "GET",
    data,
    code,
    msg,
  })
}

export const PostSuccessResponse = ({
  data,
  code,
  msg,
}: Omit<ResponseParams, "method">) => {
  return ConstructSuccessResponse({
    method: "POST",
    data,
    code,
    msg,
  })
}

export const PatchSuccessResponse = ({
  data,
  code,
  msg,
}: Omit<ResponseParams, "method">) => {
  return ConstructSuccessResponse({
    method: "PATCH",
    data,
    code,
    msg,
  })
}

export const DeleteSuccessResponse = ({
  data,
  code,
  msg,
}: Omit<ResponseParams, "method">) => {
  return ConstructSuccessResponse({
    method: "DELETE",
    data,
    code,
    msg,
  })
}
