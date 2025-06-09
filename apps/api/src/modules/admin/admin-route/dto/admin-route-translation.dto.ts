import { IsString } from 'class-validator'

export class AdminRouteTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  routeName: string
}
