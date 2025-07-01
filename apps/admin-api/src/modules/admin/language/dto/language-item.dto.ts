import { ApiProperty } from '@nestjs/swagger'
import { LanguageOrientation } from '@aiknew/shared-api-prisma'
import type { ILanguage } from '@aiknew/shared-types'

export class LanguageItemDto implements ILanguage {
  name: string

  key: string

  @ApiProperty({ enum: LanguageOrientation, enumName: 'LanguageOrientation' })
  orientation: LanguageOrientation

  status: boolean

  order: number

  createdAt: Date

  updatedAt: Date
}
