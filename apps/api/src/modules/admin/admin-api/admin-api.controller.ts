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
import { AdminApiService } from './admin-api.service'
import { PaginationDto, PaginationResponseDto } from 'src/common/dtos'
import {
  AppApiPaginationResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
} from 'src/common/decorators'
import { AdminApiDto } from './dto/admin-api.dto'
import { CreateApiDto } from './dto/create-api.dto'
import { UpdateApiDto } from './dto/update-api.dto'
import { AdminApiTreeListDto } from './dto/admin-api-tree-list.dto'
import { AdminApiAncestorsDto } from './dto/admin-api-ancestors.dto'

@Controller('admin-api')
export class AdminApiController {
  constructor(private adminApiService: AdminApiService) {}

  @Get()
  @AppApiPaginationResponse(AdminApiDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AdminApiDto[]>> {
    return await this.adminApiService.pagination(paginationDto)
  }

  @Get('ancestors')
  @AppApiOkResponse(AdminApiAncestorsDto)
  findAllAncestors(@Query('ids') ids: string[]): Promise<AdminApiAncestorsDto> {
    return this.adminApiService.findAncestors(ids)
  }

  @Get(':id/children')
  @AppApiOkResponse([AdminApiDto])
  async getChildren(@Param('id') id: string): Promise<AdminApiDto[]> {
    return await this.adminApiService.getChildren(id)
  }

  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() createApiDto: CreateApiDto) {
    await this.adminApiService.createOne(createApiDto)
  }

  @Patch(':id')
  @AppApiOkResponse()
  async updateOne(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    await this.adminApiService.updateOne(id, updateApiDto)
  }

  @Delete(':id')
  @AppApiOkResponse()
  async deleteOne(@Param('id') id: string) {
    await this.adminApiService.deleteOne(id)
  }
}
