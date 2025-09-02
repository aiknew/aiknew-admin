import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { AppApiCreatedResponse, AppApiOkResponse, AppApiPaginationResponse } from "@aiknew/shared-api-decorators";
import { ConfigDto } from "./dto/config.dto";
import { PaginationResponseDto } from "@aiknew/shared-api-dtos";
import { CreateConfigDto } from "./dto/create-config.dto";
import { UpdateConfigDto } from "./dto/update-config.dto";
import { ConfigService } from "./config.service";
import { QueryConfigDto } from "./dto/query-config.dto";

@Controller('config')
export class ConfigController {

  constructor(private readonly configService: ConfigService) { }

  @Get()
  @AppApiPaginationResponse(ConfigDto)
  async pagination(@Query() query: QueryConfigDto): Promise<PaginationResponseDto<ConfigDto[]>> {
    return this.configService.pagination(query)
  }

  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateConfigDto) {
    return this.configService.createOne(data)
  }

  @Patch(":id")
  @AppApiOkResponse()
  async updateOne(@Param("id") id: string, @Body() data: UpdateConfigDto) {
    return this.configService.updateOne(id, data)
  }

  @Delete(":id")
  @AppApiOkResponse()
  async deleteOne(@Param("id") id: string) {
    return this.configService.deleteOne(id)
  }
}