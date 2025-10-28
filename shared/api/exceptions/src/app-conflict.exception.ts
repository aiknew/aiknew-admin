import { HttpStatus } from "@nestjs/common"
import { AppHttpException } from "./app-http-exception"

export class AppConflictException extends AppHttpException {
  constructor(msg: string = "Conflict Request") {
    super(msg, HttpStatus.CONFLICT)
  }
}
