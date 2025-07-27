import { OmitType } from '@nestjs/swagger'
import { AuthApiDto } from './auth-api.dto'

export class AuthApiTreeListDto extends OmitType(AuthApiDto, [
  'order',
  'createdAt',
  'updatedAt',
]) {
  // FIXME: Swagger UI displays the wrong type, but the generated JSON file is correct
  children: AuthApiTreeListDto[]
}
