import { HttpStatus } from '@nestjs/common'
import { AppHttpException } from './app-http-exception'
import { ResponseStatusCode } from '../enums'

export class AppUnauthorizedException extends AppHttpException {
  code = ResponseStatusCode.UNAUTHORIZED

  constructor(msg: string = 'Unauthorized') {
    super(msg, HttpStatus.UNAUTHORIZED)
  }
}
