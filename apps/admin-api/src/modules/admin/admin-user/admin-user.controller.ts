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
} from '@aiknew/shared-api-decorators'
import { AdminUserDto } from './dto/admin-user.dto'
import { CreateAdminUserDto } from './dto/create-admin-user.dto'
import { UpdateAdminUserDto } from './dto/update-admin-user.dto'

@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @AppApiPaginationResponse(AdminUserDto)
  @Get()
  pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AdminUserDto[]>> {
    return this.adminUserService.pagination(paginationDto)
  }

  @AppApiCreatedResponse()
  @Post()
  async createOne(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.adminUserService.createOne(createAdminUserDto)
  }

  @AppApiOkResponse()
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ) {
    return this.adminUserService.updateOne(id, updateAdminUserDto)
  }

  @AppApiOkResponse()
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.adminUserService.deleteOne(id)
  }
}
