import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationDto } from '@aiknew/shared-api-dtos'

export class QueryAuthRoleDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string
}