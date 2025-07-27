import { PartialType } from '@nestjs/swagger'
import { CreateAuthRouteDto } from './create-auth-route.dto'

export class UpdateAuthRouteDto extends PartialType(CreateAuthRouteDto) {}
