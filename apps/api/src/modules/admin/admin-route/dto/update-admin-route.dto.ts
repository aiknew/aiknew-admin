import { PartialType } from '@nestjs/swagger'
import { CreateAdminRouteDto } from './create-admin-route.dto'

export class UpdateAdminRouteDto extends PartialType(CreateAdminRouteDto) {}
