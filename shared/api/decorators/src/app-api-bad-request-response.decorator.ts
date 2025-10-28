import { Type } from "@nestjs/common"
import { ApiBadRequestResponse } from "@nestjs/swagger"
import { AppApiResponse } from "./app-api-response.decorator.js"
import { type ArrayAble } from "@aiknew/shared-api-types"

export const AppApiBadRequestResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiBadRequestResponse, model)
}
