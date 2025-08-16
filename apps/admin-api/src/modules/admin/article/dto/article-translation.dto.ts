import { IsNotEmpty, IsString } from 'class-validator'

export class ArticleTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  content: string
}
