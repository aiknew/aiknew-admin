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
import { ArticleService } from './article.service'
import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  AppApiPaginationResponse,
} from '@aiknew/shared-api-decorators'
import { ArticleDto } from './dto/article.dto'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @AppApiPaginationResponse(ArticleDto)
  async pagination(
    @Query() pagination: PaginationDto,
  ): Promise<PaginationResponseDto<ArticleDto[]>> {
    return this.articleService.pagination(pagination)
  }

  @Get(':id')
  @AppApiOkResponse(ArticleDto)
  async detail(@Param('id') id: number): Promise<ArticleDto> {
    return this.articleService.getDetail(id)
  }

  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateArticleDto) {
    return this.articleService.createOne(data)
  }

  @Patch(':id')
  @AppApiOkResponse()
  async updateOne(@Param('id') id: number, @Body() data: UpdateArticleDto) {
    return this.articleService.updateOne(id, data)
  }

  @Delete(':id')
  @AppApiOkResponse()
  async deleteOne(@Param('id') id: number) {
    return this.articleService.deleteOne(id)
  }
}
