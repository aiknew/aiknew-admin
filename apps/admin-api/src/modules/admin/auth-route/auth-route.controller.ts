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
import { AuthRouteService } from './auth-route.service'
import { UpdateAuthRouteDto } from './dto/update-auth-route.dto'
import { CreateAuthRouteDto } from './dto/create-auth-route.dto'
import { AuthRouteDto } from './dto/auth-route.dto'
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  AppApiPaginationResponse,
} from '@aiknew/shared-api-decorators'
import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
import { AuthRouteAncestorsDto } from './dto/auth-route-ancestors.dto'

@Controller('auth-route')
export class AuthRouteController {
  constructor(private service: AuthRouteService) {}

  @Get()
  @AppApiPaginationResponse(AuthRouteDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AuthRouteDto[]>> {
    return await this.service.pagination(paginationDto)
  }

  @Get('ancestors')
  @AppApiOkResponse(AuthRouteAncestorsDto)
  findAllAncestors(
    @Query('ids') ids: string[],
  ): Promise<AuthRouteAncestorsDto> {
    return this.service.findAncestors(ids)
  }

  @Get(':id/children')
  @AppApiOkResponse([AuthRouteDto])
  async getChildren(@Param('id') id: string): Promise<AuthRouteDto[]> {
    return await this.service.getChildren(id)
  }

  @AppApiCreatedResponse()
  @Post()
  async createOne(@Body() data: CreateAuthRouteDto) {
    await this.service.createOne(data)
  }

  @Get('all')
  @AppApiOkResponse([AuthRouteDto])
  getAll() {
    return this.service.getAll()
  }

  @AppApiOkResponse()
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateAdminRouteDto: UpdateAuthRouteDto,
  ) {
    await this.service.updateOne(id, updateAdminRouteDto)
  }

  @AppApiOkResponse()
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.service.deleteOne(id)
  }
}
