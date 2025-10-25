import { PaginationDto } from "@aiknew/shared-api-dtos"
import { IsOptional, IsString } from "class-validator"

export class QueryAdminUserDto extends PaginationDto {
  @IsString()
  @IsOptional()
  userName?: string
}
