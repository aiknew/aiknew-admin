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
import { AuthApiService } from './auth-api.service'
import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
import {
  AppApiPaginationResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
} from '@aiknew/shared-api-decorators'
import { AuthApiDto } from './dto/auth-api.dto'
import { CreateAuthApiDto } from './dto/create-auth-api.dto'
import { UpdateAuthApiDto } from './dto/update-auth-api.dto'
import { AuthApiTreeListDto } from './dto/auth-api-tree-list.dto'
import { AuthApiAncestorsDto } from './dto/auth-api-ancestors.dto'

@Controller('auth-api')
export class AuthApiController {
  constructor(private service: AuthApiService) {}

  @Get()
  @AppApiPaginationResponse(AuthApiDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AuthApiDto[]>> {
    return await this.service.pagination(paginationDto)
  }

  @Get('ancestors')
  @AppApiOkResponse(AuthApiAncestorsDto)
  findAllAncestors(@Query('ids') ids: string[]): Promise<AuthApiAncestorsDto> {
    return this.service.findAncestors(ids)
  }

  @Get(':id/children')
  @AppApiOkResponse([AuthApiDto])
  async getChildren(@Param('id') id: string): Promise<AuthApiDto[]> {
    return await this.service.getChildren(id)
  }

  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() createApiDto: CreateAuthApiDto) {
    await this.service.createOne(createApiDto)
  }

  @Patch(':id')
  @AppApiOkResponse()
  async updateOne(
    @Param('id') id: string,
    @Body() updateApiDto: UpdateAuthApiDto,
  ) {
    await this.service.updateOne(id, updateApiDto)
  }

  @Delete(':id')
  @AppApiOkResponse()
  async deleteOne(@Param('id') id: string) {
    await this.service.deleteOne(id)
  }
}
