import { Type } from '@nestjs/common'
import { AppApiResponse } from './app-api-response.decorator'
import { ApiForbiddenResponse } from '@nestjs/swagger'
import { ArrayAble } from '../types/utility'

export const AppApiForbiddenResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiForbiddenResponse, model)
}
