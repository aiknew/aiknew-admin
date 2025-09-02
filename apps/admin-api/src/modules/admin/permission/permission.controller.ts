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
import { PermissionService } from './permission.service'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  Permission,
  PermissionGroup
} from '@aiknew/shared-api-decorators'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { PermissionsAndGroupsDto } from './dto/permissions-and-groups.dto'
import { PermissionDto } from './dto/permission.dto'
import { QueryPermissionDto } from './dto/query-permission.dto'

@PermissionGroup({ name: 'permission.permissionManagement' })
@Controller('permission')
export class PermissionController {
  constructor(private service: PermissionService) { }

  @Get()
  @Permission({ key: 'permission:pagination', name: 'permission.permissionPagination' })
  @AppApiOkResponse(PermissionsAndGroupsDto)
  async pagination(
    @Query() query: PaginationDto,
  ): Promise<PermissionsAndGroupsDto> {
    return await this.service.pagination(query)
  }

  @Get('all')
  @Permission({ key: 'permission:getAll', name: 'permission.permissionGetAll' })
  @AppApiOkResponse([PermissionDto])
  async getAll(@Query() query: QueryPermissionDto): Promise<PermissionDto[]> {
    return await this.service.getAll(query)
  }

  @Post()
  @Permission({ key: 'permission:create', name: 'permission.permissionCreate' })
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreatePermissionDto) {
    await this.service.createOne(data)
  }

  @Patch(':id')
  @Permission({ key: 'permission:update', name: 'permission.permissionUpdate' })
  @AppApiOkResponse()
  async updateOne(
    @Param('id') id: string,
    @Body() updateApiDto: UpdatePermissionDto,
  ) {
    await this.service.updateOne(id, updateApiDto)
  }

  @Delete(':id')
  @Permission({ key: 'permission:delete', name: 'permission.permissionDelete' })
  @AppApiOkResponse()
  async deleteOne(@Param('id') id: string) {
    await this.service.deleteOne(id)
  }
}
