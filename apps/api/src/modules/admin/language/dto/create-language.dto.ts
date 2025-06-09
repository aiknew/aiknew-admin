import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { LanguageOrientation } from '@prisma/client'

export class CreateLanguageDto {
  @IsString()
  name: string

  @IsString()
  key: string

  @ApiProperty({ enum: LanguageOrientation })
  @IsOptional()
  @IsEnum(LanguageOrientation)
  @IsString()
  orientation?: LanguageOrientation

  @IsOptional()
  @IsBoolean()
  status?: boolean

  @IsOptional()
  @IsNumber()
  order?: number
}
