import { ApiProperty } from '@nestjs/swagger'
import { RequestMethod } from '@aiknew/shared-admin-db'
import { AuthApiTranslationDto } from './auth-api-translation.dto'
import { ValidateTranslations } from 'src/common/validators'
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateAuthApiDto {
  @ApiProperty({ enum: RequestMethod, enumName: 'RequestMethod' })
  @IsEnum(RequestMethod)
  method: RequestMethod

  @IsString()
  url: string

  @IsString()
  parentId: string

  @IsNumber()
  order: number

  @ValidateNested()
  @ValidateTranslations(AuthApiTranslationDto)
  @Type(() => AuthApiTranslationDto)
  translations: AuthApiTranslationDto[]
}
