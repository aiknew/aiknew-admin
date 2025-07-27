import { AuthApiDto } from './auth-api.dto'
import { ApiProperty } from '@nestjs/swagger'

export class AuthApiAncestorsDto {
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

  list: AuthApiDto[]
}
