import { IsString } from 'class-validator'

export class AuthApiTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  apiName: string
}
