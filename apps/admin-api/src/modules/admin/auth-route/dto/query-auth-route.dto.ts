import { IsOptional, IsString, IsEnum } from 'class-validator'
import { RouteType } from '@aiknew/shared-admin-db'
import { ApiProperty } from '@nestjs/swagger'

export class QueryAuthRouteDto {
  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(RouteType)
  @ApiProperty({ enumName: 'RouteType', enum: RouteType })
  type?: RouteType
}