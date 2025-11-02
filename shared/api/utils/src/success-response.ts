import { ResponseJson } from "@aiknew/shared-api-dtos"
import { ResponseStatusCode } from "@aiknew/shared-api-enums"

export class SuccessResponse {
  code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode] =
    ResponseStatusCode.COMMON_SUCCESS
  msg: string = "success"
  data: Record<string, unknown> = {}
  isRaw: boolean = false
  rawData: unknown

  constructor(msg: string, raw?: false)
  constructor(data: Record<string, unknown>, raw?: false)
  constructor(rawData: unknown, raw: true)
  constructor(param: unknown, raw?: boolean) {
    this.isRaw = Boolean(raw)

    if (raw) {
      this.rawData = param
    } else if (typeof param === "string") {
      this.msg = param
    } else if (typeof param === "object") {
      this.data = param as Record<string, unknown>
    }
  }

  setCode(code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode]) {
    this.code = code
    return this
  }

  setData(data: Record<string, unknown>) {
    this.data = data
    return this
  }

  setMsg(msg: string) {
    this.msg = msg
    return this
  }

  getResponseJson(): ResponseJson {
    return {
      code: this.code,
      data: this.data,
      msg: this.msg,
    }
  }

  getResponseRaw() {
    return this.rawData
  }
}
