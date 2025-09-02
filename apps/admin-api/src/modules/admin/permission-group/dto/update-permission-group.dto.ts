import { PartialType } from '@nestjs/swagger'
import { CreatePermissionGroupDto } from './create-permission-group.dto'

export class UpdatePermissionGroupDto extends PartialType(CreatePermissionGroupDto) { }