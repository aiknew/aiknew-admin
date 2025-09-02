import { ApiProperty } from '@nestjs/swagger'
import { RequestMethod, AdminPermissionSource } from '@aiknew/shared-admin-db'
import { PermissionTranslationDto } from './permission-translation.dto'

export class PermissionDto {
  id: string

  path: string | null

  @ApiProperty({ enumName: 'RequestMethod', enum: RequestMethod })
  method: RequestMethod | null

  key: string

  @ApiProperty({ enumName: 'AdminPermissionSource', enum: AdminPermissionSource })
  source: AdminPermissionSource

  groupId: string | null

  order: number

  createdAt: Date

  updatedAt: Date

  translations: PermissionTranslationDto[]
}
