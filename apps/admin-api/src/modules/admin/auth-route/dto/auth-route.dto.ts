import { ApiProperty } from '@nestjs/swagger'
import { RouteType } from '@aiknew/shared-admin-db'
import { AuthRouteTranslationDto } from './auth-route-translation.dto'

export class AuthRouteDto {
  id: string

  icon: string

  redirect: string

  hidden: boolean

  component: string

  @ApiProperty({ enum: RouteType, enumName: 'RouteType' })
  type: RouteType

  key: string

  status: boolean

  path: string

  parentId: string

  order: number

  createdAt: Date

  updatedAt: Date

  permissions: string[]

  translations: AuthRouteTranslationDto[]
}
