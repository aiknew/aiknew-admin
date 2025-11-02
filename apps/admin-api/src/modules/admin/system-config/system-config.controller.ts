import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common"
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  AppApiPaginationResponse,
  Permission,
  PermissionGroup,
  Public,
} from "@aiknew/shared-api-decorators"
import { PaginationResponseDto } from "@aiknew/shared-api-dtos"
import { SystemConfigService } from "./system-config.service"
import {
  SystemConfigDto,
  CreateSystemConfigDto,
  UpdateSystemConfigDto,
  QuerySystemConfigDto,
} from "./dto"
import { GetPublicConfigDto } from "./dto/get-config.dto"

@PermissionGroup({ name: "config.configManagement" })
@Controller("system-config")
export class SystemConfigController {
  constructor(private readonly configService: SystemConfigService) {}

  @Permission({ key: "config:pagination", name: "config.configPagination" })
  @Get()
  @AppApiPaginationResponse(SystemConfigDto)
  pagination(
    @Query() query: QuerySystemConfigDto,
  ): Promise<PaginationResponseDto<SystemConfigDto[]>> {
    return this.configService.pagination(query)
  }

  @Public()
  @Get("public/:key")
  @AppApiOkResponse(GetPublicConfigDto)
  async getOne(@Param("key") key: string): Promise<GetPublicConfigDto> {
    return this.configService.getPublicConfig(key)
  }

  @Permission({ key: "config:create", name: "config.configCreate" })
  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateSystemConfigDto) {
    return this.configService.createOne(data)
  }

  @Permission({ key: "config:update", name: "config.configUpdate" })
  @Patch(":id")
  @AppApiOkResponse()
  async updateOne(
    @Param("id") id: string,
    @Body() data: UpdateSystemConfigDto,
  ) {
    return this.configService.updateOne(id, data)
  }

  @Permission({ key: "config:delete", name: "config.configDelete" })
  @Delete(":id")
  @AppApiOkResponse()
  async deleteOne(@Param("id") id: string) {
    return this.configService.deleteOne(id)
  }
}
