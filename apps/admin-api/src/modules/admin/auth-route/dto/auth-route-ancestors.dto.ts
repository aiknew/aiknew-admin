import { ApiProperty, OmitType } from '@nestjs/swagger'
import { AuthRouteDto } from './auth-route.dto'

class AuthRoute extends OmitType(AuthRouteDto, [
  'apis',
  'order',
  'createdAt',
  'updatedAt',
]) {}

export class AuthRouteAncestorsDto {
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

  list: AuthRoute[]
}
