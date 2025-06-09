import { Type } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { AppApiResponse } from './app-api-response.decorator'
import { ArrayAble } from '../types/utility'

export const AppApiOkResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiOkResponse, model)
}
