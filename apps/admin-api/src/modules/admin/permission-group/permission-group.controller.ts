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
import { PermissionGroupService } from './permission-group.service'
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  AppApiPaginationResponse,
  Permission,
  PermissionGroup,
} from '@aiknew/shared-api-decorators'
import { PermissionGroupDto } from './dto/permission-group.dto'
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto'
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto'
import { QueryPermissionGroupDto } from './dto/query-permission-group.dto'
import { PaginationResponseDto } from '@aiknew/shared-api-dtos'

@PermissionGroup({ name: 'permission-group.permissionGroupManagement' })
@Controller('permission-group')
export class PermissionGroupController {
  constructor(private service: PermissionGroupService) { }


  @Get()
  @Permission({ key: 'permissionGroup:pagination', name: 'permission-group.permissionGroupPagination' })
  @AppApiPaginationResponse(PermissionGroupDto)
  async pagination(
    @Query() query: QueryPermissionGroupDto
  ): Promise<PaginationResponseDto<PermissionGroupDto[]>> {
    return await this.service.pagination(query)
  }

  @Get('all')
  @Permission({ key: 'permissionGroup:getAll', name: 'permission-group.permissionGroupGetAll' })
  @AppApiOkResponse([PermissionGroupDto])
  async getAll(
  ): Promise<PermissionGroupDto[]> {
    return await this.service.getAll()
  }

  @Post()
  @Permission({ key: 'permissionGroup:create', name: 'permission-group.permissionGroupCreate' })
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreatePermissionGroupDto) {
    await this.service.createOne(data)
  }

  @Patch(':id')
  @Permission({ key: 'permissionGroup:update', name: 'permission-group.permissionGroupUpdate' })
  @AppApiOkResponse()
  async updateOne(
    @Param('id') id: string,
    @Body() updateApiGroupDto: UpdatePermissionGroupDto,
  ) {
    await this.service.updateOne(id, updateApiGroupDto)
  }

  @Delete(':id')
  @Permission({ key: 'permissionGroup:delete', name: 'permission-group.permissionGroupDelete' })
  @AppApiOkResponse()
  async deleteOne(@Param('id') id: string) {
    await this.service.deleteOne(id)
  }
}