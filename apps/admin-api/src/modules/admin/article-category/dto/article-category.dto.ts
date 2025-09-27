import { ArticleCategoryTranslationDto } from './article-category-translation.dto'

export class ArticleCategoryDto {
  id: string

  order: number

  status: boolean

  parentId: string | null

  translations: ArticleCategoryTranslationDto[]

  createdAt: Date

  updatedAt: Date
}
