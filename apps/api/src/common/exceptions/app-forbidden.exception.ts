import { HttpStatus } from '@nestjs/common'
import { AppHttpException } from './app-http-exception'

export class AppForbiddenException extends AppHttpException {
  constructor(msg: string = 'Forbidden') {
    super(msg, HttpStatus.FORBIDDEN)
  }
}
