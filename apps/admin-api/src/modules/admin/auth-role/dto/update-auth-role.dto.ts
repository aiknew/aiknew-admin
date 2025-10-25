import { PartialType } from "@nestjs/swagger"
import { CreateAuthRoleDto } from "./create-auth-role.dto"

export class UpdateAuthRoleDto extends PartialType(CreateAuthRoleDto) {}
