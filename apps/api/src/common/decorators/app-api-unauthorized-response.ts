import { Type } from '@nestjs/common'
import { ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AppApiResponse } from './app-api-response.decorator'
import { ArrayAble } from '../types/utility'

export const AppApiUnauthorizedResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiUnauthorizedResponse, model)
}
