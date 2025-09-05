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
  Permission,
  PermissionGroup,
} from '@aiknew/shared-api-decorators'
import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
import { AuthRouteAncestorsDto } from './dto/auth-route-ancestors.dto'

@PermissionGroup({ name: 'auth-route.authRouteManagement' })
@Controller('auth-route')
export class AuthRouteController {
  constructor(private service: AuthRouteService) { }

  @Get()
  @Permission({ key: 'auth-route:pagination', name: 'auth-route.authRoutePagination' })
  @AppApiPaginationResponse(AuthRouteDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AuthRouteDto[]>> {
    return await this.service.pagination(paginationDto)
  }

  @Get('ancestors')
  @Permission({ key: 'auth-route:ancestors', name: 'auth-route.authRouteGetAncestors' })
  @AppApiOkResponse(AuthRouteAncestorsDto)
  findAllAncestors(
    @Query('ids') ids: string[],
  ): Promise<AuthRouteAncestorsDto> {
    return this.service.findAncestors(ids)
  }

  @Get(':id/children')
  @Permission({ key: 'auth-route:getChildren', name: 'auth-route.authRouteGetChildren' })
  @AppApiOkResponse([AuthRouteDto])
  async getChildren(@Param('id') id: string): Promise<AuthRouteDto[]> {
    return await this.service.getChildren(id)
  }

  @Get('all')
  @Permission({ key: 'auth-route:getAll', name: 'auth-route.authRouteGetAll' })
  @AppApiOkResponse([AuthRouteDto])
  getAll() {
    return this.service.getAll()
  }

  @AppApiCreatedResponse()
  @Permission({ key: 'auth-route:create', name: 'auth-route.authRouteCreate' })
  @Post()
  async createOne(@Body() data: CreateAuthRouteDto) {
    await this.service.createOne(data)
  }

  @AppApiOkResponse()
  @Permission({ key: 'auth-route:update', name: 'auth-route.authRouteUpdate' })
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateAdminRouteDto: UpdateAuthRouteDto,
  ) {
    await this.service.updateOne(id, updateAdminRouteDto)
  }

  @AppApiOkResponse()
  @Permission({ key: 'auth-route:delete', name: 'auth-route.authRouteDelete' })
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.service.deleteOne(id)
  }
}
