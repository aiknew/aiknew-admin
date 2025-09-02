import { IsOptional, IsString } from "class-validator";

export class QueryPermissionDto {
  @IsString()
  @IsOptional()
  groupId?: string
}