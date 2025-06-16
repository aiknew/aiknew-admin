import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [],
})
export class ArticleModule {}
