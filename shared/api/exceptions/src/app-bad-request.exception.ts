import { HttpStatus } from '@nestjs/common'
import { AppHttpException } from './app-http-exception'

export class AppBadRequestException extends AppHttpException {
  constructor(msg: string = 'Bad Request') {
    super(msg, HttpStatus.BAD_REQUEST)
  }
}
