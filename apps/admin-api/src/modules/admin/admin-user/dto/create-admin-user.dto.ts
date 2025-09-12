import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateAdminUserDto {
  @IsString()
  userName: string

  @IsArray()
  @IsOptional()
  roles?: string[]

  @IsString()
  password: string
}
