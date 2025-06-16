import { ArticleCategoryTranslationDto } from './article-category-translation.dto'

export class ArticleCategoryDto {
  id: number

  order: number

  status: boolean

  parentId: number

  translations: ArticleCategoryTranslationDto[]

  createdAt: Date

  updatedAt: Date
}
