import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { ArticleCategoryService } from './article-category.service'
import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
import {
  AppApiPaginationResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
  PermissionGroup,
  Permission,
} from '@aiknew/shared-api-decorators'
import { ArticleCategoryDto } from './dto/article-category.dto'
import { CreateArticleCategoryDto } from './dto/create-article-category.dto'
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto'
import { ArticleCategoryAncestorsDto } from './dto/article-category-ancestors.dto'

@PermissionGroup({ name: 'article-category.articleCategoryManagement' })
@Controller('article-category')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) { }

  @Get()
  @Permission({ key: 'article-category:pagination', name: 'article-category.articleCategoryPagination' })
  @AppApiPaginationResponse(ArticleCategoryDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<ArticleCategoryDto[]>> {
    return this.articleCategoryService.pagination(paginationDto)
  }

  @Get('ancestors')
  @Permission({ key: 'article-category:ancestors', name: 'article-category.articleCategoryAncestors' })
  @AppApiOkResponse(ArticleCategoryAncestorsDto)
  @ApiQuery({
    name: 'ids',
    type: [Number],
  })
  findAllAncestors(
    @Query('ids', ParseIntPipe) ids: number[],
  ): Promise<ArticleCategoryAncestorsDto> {
    return this.articleCategoryService.findAncestors(ids)
  }

  @Get(':id/children')
  @Permission({ key: 'article-category:children', name: 'article-category.articleCategoryChildren' })
  @AppApiOkResponse([ArticleCategoryDto])
  async getChildren(@Param('id') id: number): Promise<ArticleCategoryDto[]> {
    return await this.articleCategoryService.getChildren(id)
  }

  @Get(':id')
  @Permission({ key: 'article-category:detail', name: 'article-category.articleCategoryDetail' })
  @AppApiOkResponse([ArticleCategoryDto])
  async getChildrenCate(
    @Param('id') id: number,
  ): Promise<ArticleCategoryDto[]> {
    return this.articleCategoryService.getChildrenCategory(id)
  }

  @Post()
  @Permission({ key: 'article-category:create', name: 'article-category.articleCategoryCreate' })
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateArticleCategoryDto) {
    await this.articleCategoryService.createOne(data)
  }

  @Patch(':id')
  @Permission({ key: 'article-category:update', name: 'article-category.articleCategoryUpdate' })
  @AppApiOkResponse()
  async updateOne(
    @Param('id') id: number,
    @Body() data: UpdateArticleCategoryDto,
  ) {
    await this.articleCategoryService.updateOne(id, data)
  }

  @Delete(':id')
  @Permission({ key: 'article-category:delete', name: 'article-category.articleCategoryDelete' })
  @AppApiOkResponse()
  async deleteOne(@Param('id') id: number) {
    await this.articleCategoryService.deleteOne(id)
  }
}
