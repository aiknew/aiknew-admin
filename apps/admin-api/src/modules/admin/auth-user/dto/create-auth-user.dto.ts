import { IsArray, IsString } from 'class-validator'

export class CreateAuthUserDto {
  @IsString()
  userName: string

  @IsArray()
  roles: string[]

  @IsString()
  password: string
}
