import { PartialType } from '@nestjs/swagger'
import { CreateAdminRoleDto } from './create-admin-role.dto'

export class UpdateAdminRoleDto extends PartialType(CreateAdminRoleDto) {}
