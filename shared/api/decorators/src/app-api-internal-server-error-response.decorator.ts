import { Type } from '@nestjs/common'
import { ApiInternalServerErrorResponse } from '@nestjs/swagger'
import { AppApiResponse } from './app-api-response.decorator.js'
import { type ArrayAble } from '@aiknew/shared-api-types'

export const AppApiInternalServerErrorResponse = (
  model?: ArrayAble<Type<any>>,
) => {
  return AppApiResponse(ApiInternalServerErrorResponse, model)
}
