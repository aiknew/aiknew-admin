import { HttpAdapterHost } from '@nestjs/core'
import { AllExceptionsFilter } from '../all-exceptions.filter'
import { ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common'
import { logger } from '../../logger'
import { AppBadRequestException } from '../../exceptions'
import { MESSAGES } from '@nestjs/core/constants'
import { ResponseStatusCode } from 'src/common/enums'

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter
  let httpAdapter: any
  let host: ArgumentsHost

  // Mock response object
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  }

  beforeEach(() => {
    httpAdapter = {
      reply: jest.fn(),
      end: jest.fn(),
      isHeadersSent: jest.fn().mockReturnValue(false),
    }

    const httpAdapterHost: HttpAdapterHost = {
      httpAdapter,
    } as any

    host = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => ({}),
      }),
      getArgByIndex: () => mockResponse,
    } as any

    filter = new AllExceptionsFilter(httpAdapterHost)
    jest.spyOn(logger, 'error').mockImplementation(() => undefined as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle AppHttpException', () => {
    const exception = new AppBadRequestException()

    filter.catch(exception, host)

    expect(httpAdapter.reply).toHaveBeenCalledWith(
      mockResponse,
      exception.getResponseJson(),
      HttpStatus.BAD_REQUEST,
    )
  })

  it('should handle NestJS built-in HttpException', () => {
    const msg = 'NestJS built-in BadRequestException'
    const exception = new BadRequestException(msg)

    filter.catch(exception, host)

    expect(httpAdapter.reply).toHaveBeenCalledWith(
      mockResponse,
      {
        code: ResponseStatusCode.COMMON_FAIL,
        data: exception.getResponse(),
        msg,
      },
      HttpStatus.BAD_REQUEST,
    )
  })

  it('should handle unknown error', () => {
    const error = new Error('Unknown error')

    filter.catch(error, host)

    expect(httpAdapter.reply).toHaveBeenCalledWith(
      mockResponse,
      {
        code: ResponseStatusCode.COMMON_FAIL,
        msg: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
        data: {},
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
    expect(logger.error).toHaveBeenCalled()
  })
})
