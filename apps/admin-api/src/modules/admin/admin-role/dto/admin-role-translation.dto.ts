import { IsString } from 'class-validator'

export class AdminRoleTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  roleName: string
}
