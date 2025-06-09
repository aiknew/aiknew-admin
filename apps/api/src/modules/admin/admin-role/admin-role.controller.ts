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
import { AdminRoleService } from './admin-role.service'
import { PaginationDto, PaginationResponseDto } from 'src/common/dtos'
import {
  AppApiPaginationResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
} from 'src/common/decorators'
import { CreateAdminRoleDto } from './dto/create-admin-role.dto'
import { UpdateAdminRoleDto } from './dto/update-admin-role.dto'
import { AdminRoleDto } from './dto/admin-role.dto'

@Controller('admin-role')
export class AdminRoleController {
  constructor(private readonly adminRoleService: AdminRoleService) {}

  @AppApiPaginationResponse(AdminRoleDto)
  @Get()
  pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AdminRoleDto[]>> {
    return this.adminRoleService.pagination(paginationDto)
  }

  @AppApiOkResponse([AdminRoleDto])
  @Get('all')
  async getAll() {
    return this.adminRoleService.getAll()
  }

  @AppApiCreatedResponse()
  @Post()
  createOne(@Body() createAdminRoleDto: CreateAdminRoleDto) {
    return this.adminRoleService.createOne(createAdminRoleDto)
  }

  @AppApiOkResponse()
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateAdminRoleDto: UpdateAdminRoleDto,
  ) {
    return this.adminRoleService.updateOne(id, updateAdminRoleDto)
  }

  @AppApiOkResponse()
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.adminRoleService.deleteOne(id)
  }
}
