import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ArticleTranslationDto } from './article-translation.dto'
import { ValidateTranslations } from '../../../../common/validators'
import { Type } from 'class-transformer'

export class CreateArticleDto {
  @IsNumber()
  order: number

  @IsBoolean()
  status: boolean

  @IsNumber()
  fakeViewCount: number

  @IsNumber()
  articleCategoryId: number


  @IsString()
  @IsOptional()
  coverImageId?: string | null

  @ValidateNested()
  @ValidateTranslations(ArticleTranslationDto)
  @Type(() => ArticleTranslationDto)
  translations: ArticleTranslationDto[]
}
