import { Type } from "@nestjs/common"
import { ApiOkResponse } from "@nestjs/swagger"
import { AppApiResponse } from "./app-api-response.decorator.js"
import { type ArrayAble } from "@aiknew/shared-api-types"

export const AppApiOkResponse = (model?: ArrayAble<Type<any>>) => {
  return AppApiResponse(ApiOkResponse, model)
}
