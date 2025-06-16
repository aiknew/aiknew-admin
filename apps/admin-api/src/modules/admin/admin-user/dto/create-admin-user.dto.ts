import { IsArray, IsString } from 'class-validator'

export class CreateAdminUserDto {
  @IsString()
  userName: string

  @IsArray()
  roles: string[]

  @IsString()
  password: string
}
