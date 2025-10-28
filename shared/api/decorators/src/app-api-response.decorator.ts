import { applyDecorators, Type } from "@nestjs/common"
import { type ArrayAble } from "@aiknew/shared-api-types"
import { ResponseJson } from "@aiknew/shared-api-dtos"
import { ApiExtraModels, getSchemaPath } from "@nestjs/swagger"

export const AppApiResponse = <DataModel extends ArrayAble<Type<any>>>(
  apiDecorator: (...args: any[]) => MethodDecorator & ClassDecorator,
  dataModel?: DataModel,
) => {
  if (!dataModel) {
    return apiDecorator({ type: ResponseJson })
  }

  const isDataArray = Array.isArray(dataModel)
  const model: Type<any> = isDataArray ? dataModel[0] : dataModel
  const data = isDataArray
    ? {
        type: "array",
        items: {
          $ref: getSchemaPath(model),
        },
      }
    : {
        type: "object",
        $ref: getSchemaPath(model),
      }

  return applyDecorators(
    ApiExtraModels(ResponseJson, model),
    apiDecorator({
      schema: {
        required: Object.keys(ResponseJson),
        allOf: [
          { $ref: getSchemaPath(ResponseJson) },
          {
            required: ["data"],
            properties: {
              data,
            },
          },
        ],
      },
    }),
  )
}
