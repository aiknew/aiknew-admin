import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { ValidateTranslations } from 'src/common/validators'
import { ArticleCategoryTranslationDto } from './article-category-translation.dto'

export class CreateArticleCategoryDto {
  @IsBoolean()
  @IsOptional()
  status?: boolean

  @IsNumber()
  @IsOptional()
  order?: number

  @IsNumber()
  parentId: number

  @ValidateNested()
  @ValidateTranslations(ArticleCategoryTranslationDto)
  @Type(() => ArticleCategoryTranslationDto)
  translations: ArticleCategoryTranslationDto[]
}
