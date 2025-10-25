import { RouteType } from "@aiknew/shared-admin-db"
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator"
import { ValidateTranslations } from "../../../../common/validators"
import { AuthRouteTranslationDto } from "./auth-route-translation.dto"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

const isSpecificTypes = (o: unknown, types: string[]) => {
  if (typeof o === "object" && o && "type" in o && typeof o.type === "string") {
    return types.includes(o.type)
  }

  return false
}

export class CreateAuthRouteDto {
  @IsArray()
  @IsOptional()
  @ValidateIf((o) => isSpecificTypes(o, ["MENU", "BUTTON"]))
  permissions?: string[]

  @IsString()
  @IsOptional()
  icon?: string

  @IsString()
  @IsOptional()
  redirect?: string

  @IsBoolean()
  @ValidateIf((o) => !isSpecificTypes(o, ["BUTTON"]))
  hidden: boolean

  @IsString()
  @ValidateIf((o) => isSpecificTypes(o, ["MENU"]))
  component: string

  @IsEnum(RouteType)
  @ApiProperty({ enumName: "RouteType", enum: RouteType })
  type: RouteType

  @IsString()
  @ValidateIf((o) => isSpecificTypes(o, ["BUTTON"]))
  key: string

  @IsBoolean()
  @ValidateIf((o) => isSpecificTypes(o, ["MENU"]))
  status: boolean

  @IsString()
  @ValidateIf((o) => isSpecificTypes(o, ["MENU"]))
  path: string

  @ValidateIf((_, value) => value !== null)
  @IsString()
  parentId: string | null

  @IsNumber()
  order: number

  @ValidateNested()
  @ValidateTranslations(AuthRouteTranslationDto)
  @Type(() => AuthRouteTranslationDto)
  translations: AuthRouteTranslationDto[]
}
