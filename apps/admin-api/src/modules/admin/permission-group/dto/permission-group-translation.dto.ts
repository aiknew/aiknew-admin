import { IsString } from 'class-validator'

export class PermissionGroupTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  groupName: string
}