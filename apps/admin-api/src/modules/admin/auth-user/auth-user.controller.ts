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
import { AuthUserService } from './auth-user.service'
import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
import {
  AppApiPaginationResponse,
  AppApiCreatedResponse,
  AppApiOkResponse,
} from '@aiknew/shared-api-decorators'
import { AuthUserDto } from './dto/auth-user.dto'
import { CreateAuthUserDto } from './dto/create-auth-user.dto'
import { UpdateAuthUserDto } from './dto/update-auth-user.dto'

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly service: AuthUserService) {}

  @AppApiPaginationResponse(AuthUserDto)
  @Get()
  pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<AuthUserDto[]>> {
    return this.service.pagination(paginationDto)
  }

  @AppApiCreatedResponse()
  @Post()
  async createOne(@Body() createAdminUserDto: CreateAuthUserDto) {
    return this.service.createOne(createAdminUserDto)
  }

  @AppApiOkResponse()
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAuthUserDto,
  ) {
    return this.service.updateOne(id, updateAdminUserDto)
  }

  @AppApiOkResponse()
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(id)
  }
}
