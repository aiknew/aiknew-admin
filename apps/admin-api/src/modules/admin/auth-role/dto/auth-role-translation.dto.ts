import { IsString } from 'class-validator'

export class AuthRoleTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  roleName: string
}
