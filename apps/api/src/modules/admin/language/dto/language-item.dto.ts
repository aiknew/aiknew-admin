import { ApiProperty } from '@nestjs/swagger'
import { LanguageOrientation } from '@prisma/client'

export class LanguageItemDto {
  name: string

  key: string

  @ApiProperty({ enum: LanguageOrientation, enumName: 'LanguageOrientation' })
  orientation: LanguageOrientation

  status: boolean

  order: number

  createdAt: Date

  updatedAt: Date
}
