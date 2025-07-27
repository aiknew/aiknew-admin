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
import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
import {
  AppApiPaginationResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
} from '@aiknew/shared-api-decorators'
import { CreateAuthRoleDto } from './dto/create-auth-role.dto'
import { UpdateAuthRoleDto } from './dto/update-auth-role.dto'
import { AuthRoleDto } from './dto/auth-role.dto'

@Controller('auth-role')
export class AuthRoleController {
  constructor(private readonly service: AuthRoleService) {}

  @AppApiPaginationResponse(AuthRoleDto)
  @Get()
  pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AuthRoleDto[]>> {
    return this.service.pagination(paginationDto)
  }

  @AppApiOkResponse([AuthRoleDto])
  @Get('all')
  async getAll() {
    return this.service.getAll()
  }

  @AppApiCreatedResponse()
  @Post()
  createOne(@Body() createAdminRoleDto: CreateAuthRoleDto) {
    return this.service.createOne(createAdminRoleDto)
  }

  @AppApiOkResponse()
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateAdminRoleDto: UpdateAuthRoleDto,
  ) {
    return this.service.updateOne(id, updateAdminRoleDto)
  }

  @AppApiOkResponse()
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(id)
  }
}
