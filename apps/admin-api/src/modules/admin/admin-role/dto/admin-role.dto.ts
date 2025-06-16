import { AdminRoleTranslationDto } from './admin-role-translation.dto'

export class AdminRoleDto {
  id: string

  order: number

  translations: AdminRoleTranslationDto[]

  routes: string[]

  createdAt: Date

  updatedAt: Date
}
