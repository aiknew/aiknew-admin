import { IsString } from 'class-validator'

export class LoginBodyDto {
  @IsString()
  userName: string

  @IsString()
  password: string

  @IsString()
  captchaKey: string

  @IsString()
  captchaCode: string
}
