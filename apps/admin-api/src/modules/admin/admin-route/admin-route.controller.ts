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
import { AdminRouteService } from './admin-route.service'
import { UpdateAdminRouteDto } from './dto/update-admin-route.dto'
import { CreateAdminRouteDto } from './dto/create-admin-route.dto'
import { AdminRouteDto } from './dto/admin-route.dto'
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  AppApiPaginationResponse,
} from '@aiknew/shared-api-decorators'
import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
import { AdminRouteAncestorsDto } from './dto/admin-route-ancestors.dto'

@Controller('admin-route')
export class AdminRouteController {
  constructor(private adminRouteService: AdminRouteService) {}

  @Get()
  @AppApiPaginationResponse(AdminRouteDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AdminRouteDto[]>> {
    return await this.adminRouteService.pagination(paginationDto)
  }

  @Get('ancestors')
  @AppApiOkResponse(AdminRouteAncestorsDto)
  findAllAncestors(
    @Query('ids') ids: string[],
  ): Promise<AdminRouteAncestorsDto> {
    return this.adminRouteService.findAncestors(ids)
  }

  @Get(':id/children')
  @AppApiOkResponse([AdminRouteDto])
  async getChildren(@Param('id') id: string): Promise<AdminRouteDto[]> {
    return await this.adminRouteService.getChildren(id)
  }

  @AppApiCreatedResponse()
  @Post()
  async createOne(@Body() createAdminRouteDto: CreateAdminRouteDto) {
    await this.adminRouteService.createOne(createAdminRouteDto)
  }

  @Get('all')
  @AppApiOkResponse([AdminRouteDto])
  getAll() {
    return this.adminRouteService.getAll()
  }

  @AppApiOkResponse()
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateAdminRouteDto: UpdateAdminRouteDto,
  ) {
    await this.adminRouteService.updateOne(id, updateAdminRouteDto)
  }

  @AppApiOkResponse()
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.adminRouteService.deleteOne(id)
  }
}
