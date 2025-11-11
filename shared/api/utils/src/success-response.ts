import { ResponseStatusCode } from "@aiknew/shared-api-enums"
import { isObject } from "./type-guard"
import { type ResponseJson } from "@aiknew/shared-api-dtos"

export class SuccessResponse {
  code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode] =
    ResponseStatusCode.COMMON_SUCCESS
  msg: string = "success"
  data: Record<string, unknown> = {}
  isRaw: boolean = false
  rawData: unknown

  setCode(code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode]) {
    this.code = code
    return this
  }

  setData(data: Record<string, unknown>) {
    if (!isObject(data)) {
      throw Error("data should be an object")
    }

    this.data = data
    return this
  }

  setMsg(msg: string) {
    this.msg = msg
    return this
  }

  setRaw(data: unknown) {
    this.isRaw = true
    this.rawData = data
    return this
  }

  getResponse() {
    if (this.isRaw) {
      return this.rawData
    }

    return {
      code: this.code,
      data: this.data,
      msg: this.msg,
    }
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
