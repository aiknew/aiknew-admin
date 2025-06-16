import { ApiProperty, OmitType } from '@nestjs/swagger'
import { AdminRouteDto } from './admin-route.dto'

class AdminRoute extends OmitType(AdminRouteDto, [
  'apis',
  'order',
  'createdAt',
  'updatedAt',
]) {}

export class AdminRouteAncestorsDto {
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  idPath: Record<string, string[]>

  list: AdminRoute[]
}
