import { PartialType } from '@nestjs/swagger'
import { CreateAuthUserDto } from './create-auth-user.dto'

export class UpdateAuthUserDto extends PartialType(CreateAuthUserDto) {}
