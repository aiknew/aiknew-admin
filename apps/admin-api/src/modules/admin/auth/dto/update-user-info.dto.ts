import { IsString } from 'class-validator'

export class UpdateUserInfoDto {
  @IsString()
  password: string

  @IsString()
  newPassword: string
}
