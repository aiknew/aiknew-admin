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
import { AuthRoleService } from './auth-role.service'
import { PaginationResponseDto } from '@aiknew/shared-api-dtos'
import {
  AppApiPaginationResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
  PermissionGroup,
  Permission,
} from '@aiknew/shared-api-decorators'
import { CreateAuthRoleDto } from './dto/create-auth-role.dto'
import { UpdateAuthRoleDto } from './dto/update-auth-role.dto'
import { AuthRoleDto } from './dto/auth-role.dto'
import { QueryAuthRoleDto } from './dto/query-auth-role.dto'

@PermissionGroup({ name: 'auth-role.authRoleManagement' })
@Controller('auth-role')
export class AuthRoleController {
  constructor(private readonly service: AuthRoleService) { }

  @AppApiPaginationResponse(AuthRoleDto)
  @Permission({ key: 'auth-role:pagination', name: 'auth-role.authRolePagination' })
  @Get()
  pagination(
    @Query() queryDto: QueryAuthRoleDto,
  ): Promise<PaginationResponseDto<AuthRoleDto[]>> {
    return this.service.pagination(queryDto)
  }

  @AppApiOkResponse([AuthRoleDto])
  @Permission({ key: 'auth-role:getAll', name: 'auth-role.authRoleGetAll' })
  @Get('all')
  async getAll() {
    return this.service.getAll()
  }

  @AppApiCreatedResponse()
  @Permission({ key: 'auth-role:create', name: 'auth-role.authRoleCreate' })
  @Post()
  createOne(@Body() createAdminRoleDto: CreateAuthRoleDto) {
    return this.service.createOne(createAdminRoleDto)
  }

  @AppApiOkResponse()
  @Permission({ key: 'auth-role:update', name: 'auth-role.authRoleUpdate' })
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateAdminRoleDto: UpdateAuthRoleDto,
  ) {
    return this.service.updateOne(id, updateAdminRoleDto)
  }

  @AppApiOkResponse()
  @Permission({ key: 'auth-role:delete', name: 'auth-role.authRoleDelete' })
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(id)
  }
}
