import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { AppApiCreatedResponse, AppApiOkResponse, AppApiPaginationResponse, Permission, PermissionGroup } from "@aiknew/shared-api-decorators";
import { ConfigDto } from "./dto/config.dto";
import { PaginationResponseDto } from "@aiknew/shared-api-dtos";
import { CreateConfigDto } from "./dto/create-config.dto";
import { UpdateConfigDto } from "./dto/update-config.dto";
import { ConfigService } from "./config.service";
import { QueryConfigDto } from "./dto/query-config.dto";

@PermissionGroup({ name: 'config.configManagement' })
@Controller('config')
export class ConfigController {

  constructor(private readonly configService: ConfigService) { }

  @Permission({ key: 'config:pagination', name: 'config.configPagination' })
  @Get()
  @AppApiPaginationResponse(ConfigDto)
  async pagination(@Query() query: QueryConfigDto): Promise<PaginationResponseDto<ConfigDto[]>> {
    return this.configService.pagination(query)
  }

  @Permission({ key: 'config:create', name: 'config.configCreate' })
  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateConfigDto) {
    return this.configService.createOne(data)
  }

  @Permission({ key: 'config:update', name: 'config.configUpdate' })
  @Patch(":id")
  @AppApiOkResponse()
  async updateOne(@Param("id") id: string, @Body() data: UpdateConfigDto) {
    return this.configService.updateOne(id, data)
  }

  @Permission({ key: 'config:delete', name: 'config.configDelete' })
  @Delete(":id")
  @AppApiOkResponse()
  async deleteOne(@Param("id") id: string) {
    return this.configService.deleteOne(id)
  }
}