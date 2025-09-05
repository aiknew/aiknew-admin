import { ApiProperty } from '@nestjs/swagger'
import { PermissionGroupTranslationDto } from './permission-group-translation.dto'
import { ValidateTranslations } from '../../../../common/validators'
import { IsNumber, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePermissionGroupDto {
  @ApiProperty({ required: false })
  @IsNumber()
  order?: number

  @ValidateNested()
  @ValidateTranslations(PermissionGroupTranslationDto)
  @Type(() => PermissionGroupTranslationDto)
  translations: PermissionGroupTranslationDto[]
}