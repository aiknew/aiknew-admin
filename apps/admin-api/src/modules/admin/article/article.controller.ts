import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common"
import { ArticleService } from "./article.service"
import { PaginationResponseDto } from "@aiknew/shared-api-dtos"
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  AppApiPaginationResponse,
  Permission,
  PermissionGroup,
} from "@aiknew/shared-api-decorators"
import { ArticleDto } from "./dto/article.dto"
import { CreateArticleDto } from "./dto/create-article.dto"
import { UpdateArticleDto } from "./dto/update-article.dto"
import { QueryArticleDto } from "./dto/query-article.dto"

@PermissionGroup({ name: "article.articleManagement" })
@Controller("article")
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @Permission({ key: "article:pagination", name: "article.articlePagination" })
  @AppApiPaginationResponse(ArticleDto)
  async pagination(
    @Query() query: QueryArticleDto,
  ): Promise<PaginationResponseDto<ArticleDto[]>> {
    return this.articleService.pagination(query)
  }

  @Get(":id")
  @Permission({ key: "article:detail", name: "article.articleDetail" })
  @AppApiOkResponse(ArticleDto)
  async detail(@Param("id") id: string): Promise<ArticleDto> {
    return this.articleService.getDetail(id)
  }

  @Post()
  @Permission({ key: "article:create", name: "article.articleCreate" })
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateArticleDto) {
    return this.articleService.createOne(data)
  }

  @Patch(":id")
  @Permission({ key: "article:update", name: "article.articleUpdate" })
  @AppApiOkResponse()
  async updateOne(@Param("id") id: string, @Body() data: UpdateArticleDto) {
    return this.articleService.updateOne(id, data)
  }

  @Delete(":id")
  @Permission({ key: "article:delete", name: "article.articleDelete" })
  @AppApiOkResponse()
  async deleteOne(@Param("id") id: string) {
    return this.articleService.deleteOne(id)
  }
}
