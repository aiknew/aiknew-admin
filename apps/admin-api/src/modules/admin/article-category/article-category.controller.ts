import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ArticleCategoryService } from './article-category.service'
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  PermissionGroup,
  Permission,
} from '@aiknew/shared-api-decorators'
import { ArticleCategoryDto } from './dto/article-category.dto'
import { CreateArticleCategoryDto } from './dto/create-article-category.dto'
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto'
import { QueryArticleCategoryDto } from './dto/query-article-category.dto'

@PermissionGroup({ name: 'article-category.articleCategoryManagement' })
@Controller('article-category')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) { }

  /**
   * Get all article categories 
   */
  @Get('all')
  @Permission({ key: 'article-category:getAll', name: 'article-category.articleCategoryGetAll' })
  @AppApiOkResponse([ArticleCategoryDto])
  async getAll(@Query() query: QueryArticleCategoryDto): Promise<ArticleCategoryDto[]> {
    return this.articleCategoryService.getAll(query)
  }

  /**
   * Create article category 
   */
  @Post()
  @Permission({ key: 'article-category:create', name: 'article-category.articleCategoryCreate' })
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateArticleCategoryDto) {
    await this.articleCategoryService.createOne(data)
  }

  /**
   * Update Article Category 
   */
  @Patch(':id')
  @Permission({ key: 'article-category:update', name: 'article-category.articleCategoryUpdate' })
  @AppApiOkResponse()
  async updateOne(
    @Param('id') id: string,
    @Body() data: UpdateArticleCategoryDto,
  ) {
    await this.articleCategoryService.updateOne(id, data)
  }

  /**
   * Delete Article Category 
   */
  @Delete(':id')
  @Permission({ key: 'article-category:delete', name: 'article-category.articleCategoryDelete' })
  @AppApiOkResponse()
  async deleteOne(@Param('id') id: string) {
    await this.articleCategoryService.deleteOne(id)
  }
}
