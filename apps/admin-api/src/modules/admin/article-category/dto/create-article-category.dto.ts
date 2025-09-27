import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { ValidateTranslations } from '../../../../common/validators'
import { ArticleCategoryTranslationDto } from './article-category-translation.dto'

export class CreateArticleCategoryDto {
  @IsBoolean()
  @IsOptional()
  status?: boolean

  @IsNumber()
  @IsOptional()
  order?: number

  @ValidateIf((_, value) => value !== null)
  @IsString()
  parentId: string | null

  @ValidateNested()
  @ValidateTranslations(ArticleCategoryTranslationDto)
  @Type(() => ArticleCategoryTranslationDto)
  translations: ArticleCategoryTranslationDto[]
}
