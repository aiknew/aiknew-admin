import { ResponseJson } from "@aiknew/shared-api-dtos"
import { ResponseStatusCode } from "@aiknew/shared-api-enums"

export class SuccessResponse {
  code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode] =
    ResponseStatusCode.COMMON_SUCCESS
  msg: string = "success"
  data: Record<string, unknown> = {}

  constructor(msg: string)
  constructor(data: Record<string, unknown>)
  constructor(param: string | Record<string, unknown>) {
    if (typeof param === "string") {
      this.msg = param
    }

    if (typeof param === "object") {
      this.data = param
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
}
