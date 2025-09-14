import { ApiProperty } from '@nestjs/swagger'
import { RequestMethod } from '@aiknew/shared-admin-db'
import { PermissionTranslationDto } from './permission-translation.dto'
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ValidateTranslations } from '../../../../common/validators'

export class CreatePermissionDto {
  @ApiProperty({ enum: RequestMethod, enumName: 'RequestMethod' })
  @IsEnum(RequestMethod)
  @IsOptional()
  method?: RequestMethod

  @IsString()
  @IsOptional()
  path?: string

  @IsString()
  key: string

  @IsString()
  @IsOptional()
  groupId?: string | null

  @IsNumber()
  order: number

  @ValidateNested()
  @ValidateTranslations(PermissionTranslationDto)
  @Type(() => PermissionTranslationDto)
  translations: PermissionTranslationDto[]
}
