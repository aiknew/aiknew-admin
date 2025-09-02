import { PermissionGroupTranslationDto } from './permission-group-translation.dto'

export class PermissionGroupDto {
  id: string

  order: number

  createdAt: Date

  updatedAt: Date

  translations: PermissionGroupTranslationDto[]
}