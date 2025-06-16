import { Type } from '@nestjs/common'
import { AppApiResponse } from './app-api-response.decorator.js'
import { ApiForbiddenResponse } from '@nestjs/swagger'
import { type ArrayAble } from '@aiknew/shared-api-types'

export const AppApiForbiddenResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiForbiddenResponse, model)
}
