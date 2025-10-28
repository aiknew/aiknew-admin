import { HttpStatus } from "@nestjs/common"
import { AppHttpException } from "./app-http-exception"

export class AppNotFoundException extends AppHttpException {
  constructor(msg: string = "Not Found") {
    super(msg, HttpStatus.NOT_FOUND)
  }
}
