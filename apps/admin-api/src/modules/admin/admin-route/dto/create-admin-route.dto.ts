import { RouteType } from '@aiknew/shared-admin-db'
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { ValidateTranslations } from 'src/common/validators'
import { AdminRouteTranslationDto } from './admin-route-translation.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

const isSpecificTypes = (o: any, types: RouteType[]) => {
  if (o.type) {
    return types.includes(o.type)
  }

  return false
}

export class CreateAdminRouteDto {
  @IsArray()
  @ValidateIf((o) => isSpecificTypes(o, ['MENU', 'BUTTON']))
  apis: string[]

  @IsString()
  @IsOptional()
  icon?: string

  @IsString()
  @IsOptional()
  redirect?: string

  @IsBoolean()
  @ValidateIf((o) => !isSpecificTypes(o, ['BUTTON']))
  hidden: boolean

  @IsString()
  @ValidateIf((o) => isSpecificTypes(o, ['MENU']))
  component: string

  @IsEnum(RouteType)
  @ApiProperty({ enumName: 'RouteType', enum: RouteType })
  type: RouteType

  @IsString()
  @ValidateIf((o) => isSpecificTypes(o, ['BUTTON']))
  key: string

  @IsBoolean()
  @ValidateIf((o) => isSpecificTypes(o, ['MENU']))
  status: boolean

  @IsString()
  @ValidateIf((o) => isSpecificTypes(o, ['MENU']))
  path: string

  @IsString()
  parentId: string

  @IsNumber()
  order: number

  @ValidateNested()
  @ValidateTranslations(AdminRouteTranslationDto)
  @Type(() => AdminRouteTranslationDto)
  translations: AdminRouteTranslationDto[]
}
