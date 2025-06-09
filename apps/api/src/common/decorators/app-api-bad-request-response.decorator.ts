import { Type } from '@nestjs/common'
import { ApiBadRequestResponse } from '@nestjs/swagger'
import { AppApiResponse } from './app-api-response.decorator'
import { ArrayAble } from '../types/utility'

export const AppApiBadRequestResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiBadRequestResponse, model)
}
