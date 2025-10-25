import { IsString } from "class-validator"

export class ArticleCategoryTranslationDto {
  @IsString()
  langKey: string

  @IsString()
  name: string
}
