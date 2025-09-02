import { IsOptional, IsString } from 'class-validator'

export class PermissionTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  permissionName: string

  @IsString()
  @IsOptional()
  remark?: string | null
}
