import { IsString } from 'class-validator'

export class AdminApiTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  apiName: string
}
