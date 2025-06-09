import { ArticleTranslationDto } from './article-translation.dto'

export class ArticleDto {
  id: number

  order: number

  status: boolean

  realViewCount: number

  fakeViewCount: number

  articleCategoryId: number

  translations: ArticleTranslationDto[]

  createdAt: Date

  updatedAt: Date
}
