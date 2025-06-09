import { ApiProperty } from '@nestjs/swagger'
import { ArticleCategoryDto } from './article-category.dto'

export class ArticleCategoryAncestorsDto {
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  })
  idPath: Record<number, number[]>

  list: ArticleCategoryDto[]
}
