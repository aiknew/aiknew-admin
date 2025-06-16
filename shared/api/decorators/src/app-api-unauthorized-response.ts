import { Type } from '@nestjs/common'
import { ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AppApiResponse } from './app-api-response.decorator.js'
import { type ArrayAble } from '@aiknew/shared-api-types'

export const AppApiUnauthorizedResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiUnauthorizedResponse, model)
}
