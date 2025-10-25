import { AuthRoleTranslationDto } from "./auth-role-translation.dto"

export class AuthRoleDto {
  id: string

  order: number

  translations: AuthRoleTranslationDto[]

  routes: string[]

  createdAt: Date

  updatedAt: Date
}
