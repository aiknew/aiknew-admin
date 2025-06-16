import { AdminApiDto } from './admin-api.dto'
import { ApiProperty } from '@nestjs/swagger'

export class AdminApiAncestorsDto {
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

  list: AdminApiDto[]
}
