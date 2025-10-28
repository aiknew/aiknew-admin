import { Type } from "@nestjs/common"
import { ApiConflictResponse } from "@nestjs/swagger"
import { AppApiResponse } from "./app-api-response.decorator.js"
import { type ArrayAble } from "@aiknew/shared-api-types"

export const AppApiConflictResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiConflictResponse, model)
}
