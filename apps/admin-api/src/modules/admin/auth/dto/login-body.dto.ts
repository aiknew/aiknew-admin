import { IsOptional, IsString } from "class-validator"

export class LoginBodyDto {
  @IsString()
  userName: string

  @IsString()
  password: string

  @IsOptional()
  @IsString()
  captchaKey?: string

  @IsOptional()
  @IsString()
  captchaCode?: string

  @IsOptional()
  @IsString()
  altchaPayload?: string
}
