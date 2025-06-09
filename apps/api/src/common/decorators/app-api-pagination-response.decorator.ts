import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { PaginationResponseDto } from '../dtos/pagination-response.dto'
import { ResponseJson } from '../dtos'

export const AppApiPaginationResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(ResponseJson, PaginationResponseDto, model),
    ApiOkResponse({
      schema: {
        required: Object.keys(ResponseJson),
        allOf: [
          { $ref: getSchemaPath(ResponseJson) },
          {
            required: ['data'],
            properties: {
              data: {
                allOf: [
                  { $ref: getSchemaPath(PaginationResponseDto) },
                  {
                    required: ['list'],
                    properties: {
                      list: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
  )
}
