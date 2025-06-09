import { IsString } from 'class-validator'

export class ArticleTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  title: string

  @IsString()
  content: string
}
