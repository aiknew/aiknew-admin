import { Type } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { AppApiResponse } from './app-api-response.decorator'
import { ArrayAble } from '../types/utility'

export const AppApiCreatedResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiCreatedResponse, model)
}
