import { Type } from '@nestjs/common'
import { ApiInternalServerErrorResponse } from '@nestjs/swagger'
import { AppApiResponse } from './app-api-response.decorator'
import { ArrayAble } from '../types/utility'

export const AppApiInternalServerErrorResponse = (
  model?: ArrayAble<Type<any>>,
) => {
  return AppApiResponse(ApiInternalServerErrorResponse, model)
}
