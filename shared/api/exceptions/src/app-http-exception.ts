import { HttpException, HttpStatus } from '@nestjs/common'
import { ResponseJson } from '@aiknew/shared-api-dtos'
import { ResponseStatusCode } from '@aiknew/shared-api-enums'

export class AppHttpException extends HttpException {
  data: Record<string, unknown> = {}
  code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode] =
    ResponseStatusCode.COMMON_FAIL
  msg: string = 'error'

  constructor(msg: string, status: HttpStatus) {
    super(msg, status)
    this.msg = msg
  }

  setData(data: Record<string, unknown>) {
    this.data = data
    return this
  }

  setCode(code: (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode]) {
    this.code = code
    return this
  }

  setMsg(msg: string) {
    this.msg = msg
    return this
  }

  setCause(cause: unknown) {
    this.cause = cause
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
