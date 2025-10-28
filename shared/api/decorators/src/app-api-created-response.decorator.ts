import { Type } from "@nestjs/common"
import { ApiCreatedResponse } from "@nestjs/swagger"
import { AppApiResponse } from "./app-api-response.decorator.js"
import { type ArrayAble } from "@aiknew/shared-api-types"

export const AppApiCreatedResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiCreatedResponse, model)
}
