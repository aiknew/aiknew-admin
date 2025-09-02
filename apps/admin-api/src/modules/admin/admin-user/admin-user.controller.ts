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
import { AdminUserService } from './admin-user.service'
import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
import {
  AppApiPaginationResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
  PermissionGroup,
  Permission,
} from '@aiknew/shared-api-decorators'
import { AdminUserDto } from './dto/admin-user.dto'
import { CreateAdminUserDto } from './dto/create-admin-user.dto'
import { UpdateAdminUserDto } from './dto/update-admin-user.dto'

@PermissionGroup({ name: 'admin-user.adminUserManagement' })
@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly service: AdminUserService) { }

  @AppApiPaginationResponse(AdminUserDto)
  @Permission({ key: 'admin-user:pagination', name: 'admin-user.adminUserPagination' })
  @Get()
  pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AdminUserDto[]>> {
    return this.service.pagination(paginationDto)
  }

  @AppApiCreatedResponse()
  @Permission({ key: 'admin-user:create', name: 'admin-user.adminUserCreate' })
  @Post()
  async createOne(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.service.createOne(createAdminUserDto)
  }

  @AppApiOkResponse()
  @Permission({ key: 'admin-user:update', name: 'admin-user.adminUserUpdate' })
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ) {
    return this.service.updateOne(id, updateAdminUserDto)
  }

  @AppApiOkResponse()
  @Permission({ key: 'admin-user:delete', name: 'admin-user.adminUserDelete' })
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(id)
  }
}
