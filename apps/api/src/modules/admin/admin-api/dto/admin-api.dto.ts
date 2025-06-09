import { ApiProperty } from '@nestjs/swagger'
import { RequestMethod } from '@prisma/client'
import { AdminApiTranslationDto } from './admin-api-translation.dto'

export class AdminApiDto {
  id: string

  url: string

  @ApiProperty({ enumName: 'RequestMethod', enum: RequestMethod })
  method: RequestMethod

  parentId: string

  order: number

  createdAt: Date

  updatedAt: Date

  translations: AdminApiTranslationDto[]
}
