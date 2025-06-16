import { Module } from '@nestjs/common'
import { ArticleCategoryController } from './article-category.controller'
import { ArticleCategoryService } from './article-category.service'

@Module({
  controllers: [ArticleCategoryController],
  providers: [ArticleCategoryService],
})
export class ArticleCategoryModule {}
