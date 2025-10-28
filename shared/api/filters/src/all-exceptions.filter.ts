import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  HttpServer,
  BadRequestException,
  Logger,
} from "@nestjs/common"
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core"
import { logger } from "@aiknew/shared-api-logger"
import { isObject } from "@nestjs/common/utils/shared.utils"
import { type Response } from "express"
import { MESSAGES } from "@nestjs/core/constants"
import { AppHttpException } from "@aiknew/shared-api-exceptions"
import { ResponseJson } from "@aiknew/shared-api-dtos"
import { getTranslation } from "@aiknew/shared-api-utils"
import { ResponseStatusCode } from "@aiknew/shared-api-enums"

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (!(exception instanceof HttpException)) {
      return this.handleUnknownError(exception, host, httpAdapter)
    }

    let responseJson: ResponseJson = {
      code: ResponseStatusCode.COMMON_FAIL,
      msg: "error",
      data: {},
    }

    if (exception instanceof AppHttpException) {
      responseJson = exception.getResponseJson()
    } else {
      // handle nestjs build-in exception
      const res = exception.getResponse()
      responseJson.msg = exception.message

      if (isObject(res)) {
        // handle BadRequestException thrown by the validation
        if (
          exception instanceof BadRequestException &&
          "message" in res &&
          Array.isArray(res.message)
        ) {
          responseJson.msg = (res.message as string[]).reduce(
            (msg: string, item: string) => (msg = msg + "." + item),
          )
        } else {
          responseJson.data = res as Record<string, unknown>
        }
      } else {
        responseJson.msg = res
      }
    }

    // translate the response message(if it's wrapped by the t function)
    responseJson.msg = getTranslation(responseJson.msg)

    // send response
    if (!httpAdapter.isHeadersSent(response)) {
      httpAdapter.reply(response, responseJson, exception.getStatus())
    } else {
      httpAdapter.end(response)
    }
  }

  public handleUnknownError(
    exception: unknown,
    host: ArgumentsHost,
    applicationRef: AbstractHttpAdapter | HttpServer,
  ) {
    const responseJson: ResponseJson = {
      msg: "",
      code: ResponseStatusCode.COMMON_FAIL,
      data: {},
    }
    const { statusCode, message } = this.isHttpError(exception)
      ? {
          statusCode: exception.statusCode,
          message: exception.message,
        }
      : {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
        }

    const response = host.getArgByIndex<Response>(1)
    if (!applicationRef.isHeadersSent(response)) {
      applicationRef.reply(
        response,
        { ...responseJson, msg: message },
        statusCode,
      )
    } else {
      applicationRef.end(response)
    }

    this.logError(exception)
  }

  private logError(exception: unknown) {
    if (process.env.NODE_ENV !== "production") {
      const logger = new Logger("Exception Handler")
      logger.error(exception)
    }

    if (this.isExceptionObject(exception)) {
      logger.error(exception.message, exception.stack)
      return
    }

    logger.error(exception)
  }

  public isExceptionObject(err: any): err is Error {
    return isObject(err) && !!(err as Error).message
  }

  /**
   * Checks if the thrown error comes from the "http-errors" library.
   * @param err error object
   */
  public isHttpError(err: any): err is { statusCode: number; message: string } {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return err?.statusCode && err?.message
  }
}
