import { ApiProperty } from '@nestjs/swagger'
import { RequestMethod } from '@prisma/client'
import { AdminApiTranslationDto } from './admin-api-translation.dto'
import { ValidateTranslations } from 'src/common/validators'
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateApiDto {
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
  @ValidateTranslations(AdminApiTranslationDto)
  @Type(() => AdminApiTranslationDto)
  translations: AdminApiTranslationDto[]
}
