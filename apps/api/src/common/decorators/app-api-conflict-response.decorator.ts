import { Type } from '@nestjs/common'
import { ApiConflictResponse } from '@nestjs/swagger'
import { AppApiResponse } from './app-api-response.decorator'
import { ArrayAble } from '../types/utility'

export const AppApiConflictResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiConflictResponse, model)
}
