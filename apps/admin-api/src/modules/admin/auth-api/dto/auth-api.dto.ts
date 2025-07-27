import { ApiProperty } from '@nestjs/swagger'
import { RequestMethod } from '@aiknew/shared-admin-db'
import { AuthApiTranslationDto } from './auth-api-translation.dto'

export class AuthApiDto {
  id: string

  url: string

  @ApiProperty({ enumName: 'RequestMethod', enum: RequestMethod })
  method: RequestMethod

  parentId: string

  order: number

  createdAt: Date

  updatedAt: Date

  translations: AuthApiTranslationDto[]
}
