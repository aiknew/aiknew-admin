import { PartialType } from '@nestjs/swagger'
import { CreateAuthApiDto } from './create-auth-api.dto'

export class UpdateAuthApiDto extends PartialType(CreateAuthApiDto) {}
