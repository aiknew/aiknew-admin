import { OmitType } from '@nestjs/swagger'
import { UploadFileDto } from '../../upload-file/dto/upload-file.dto'
import { ArticleTranslationDto } from './article-translation.dto'

class CoverImage extends OmitType(UploadFileDto, ['uploader', 'storage']) { }

export class ArticleDto {
  id: number

  order: number

  status: boolean

  realViewCount: number

  fakeViewCount: number

  articleCategoryId: number

  translations: ArticleTranslationDto[]

  coverImage: CoverImage | null

  coverImageId: string | null

  createdAt: Date

  updatedAt: Date
}
