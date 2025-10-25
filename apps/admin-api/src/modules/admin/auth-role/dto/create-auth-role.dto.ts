import { IsArray, IsNumber, ValidateNested } from "class-validator"
import { AuthRoleTranslationDto } from "./auth-role-translation.dto"
import { ValidateTranslations } from "../../../../common/validators"
import { Type } from "class-transformer"

export class CreateAuthRoleDto {
  @IsArray()
  routes: string[]

  @IsNumber()
  order: number

  @ValidateNested()
  @ValidateTranslations(AuthRoleTranslationDto)
  @Type(() => AuthRoleTranslationDto)
  translations: AuthRoleTranslationDto[]
}
