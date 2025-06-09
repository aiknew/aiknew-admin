import { IsArray, IsNumber, ValidateNested } from 'class-validator'
import { AdminRoleTranslationDto } from './admin-role-translation.dto'
import { ValidateTranslations } from 'src/common/validators'
import { Type } from 'class-transformer'

export class CreateAdminRoleDto {
  @IsArray()
  routes: string[]

  @IsNumber()
  order: number

  @ValidateNested()
  @ValidateTranslations(AdminRoleTranslationDto)
  @Type(() => AdminRoleTranslationDto)
  translations: AdminRoleTranslationDto[]
}
