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
import { PaginationDto, PaginationResponseDto } from 'src/common/dtos'
import {
  AppApiPaginationResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
} from 'src/common/decorators'
import { ArticleCategoryDto } from './dto/article-category.dto'
import { CreateArticleCategoryDto } from './dto/create-article-category.dto'
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto'
import { ArticleCategoryAncestorsDto } from './dto/article-category-ancestors.dto'

@Controller('article-category')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  @Get()
  @AppApiPaginationResponse(ArticleCategoryDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<ArticleCategoryDto[]>> {
    return this.articleCategoryService.pagination(paginationDto)
  }

  @Get('ancestors')
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
  @AppApiOkResponse([ArticleCategoryDto])
  async getChildren(@Param('id') id: number): Promise<ArticleCategoryDto[]> {
    return await this.articleCategoryService.getChildren(id)
  }

  @Get(':id')
  @AppApiOkResponse([ArticleCategoryDto])
  async getChildrenCate(
    @Param('id') id: number,
  ): Promise<ArticleCategoryDto[]> {
    return this.articleCategoryService.getChildrenCategory(id)
  }

  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateArticleCategoryDto) {
    await this.articleCategoryService.createOne(data)
  }

  @Patch(':id')
  @AppApiOkResponse()
  async updateOne(
    @Param('id') id: number,
    @Body() data: UpdateArticleCategoryDto,
  ) {
    await this.articleCategoryService.updateOne(id, data)
  }

  @Delete(':id')
  @AppApiOkResponse()
  async deleteOne(@Param('id') id: number) {
    await this.articleCategoryService.deleteOne(id)
  }
}
