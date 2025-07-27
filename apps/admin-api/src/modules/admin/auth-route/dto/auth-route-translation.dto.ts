import { IsString } from 'class-validator'

export class AuthRouteTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  routeName: string
}
