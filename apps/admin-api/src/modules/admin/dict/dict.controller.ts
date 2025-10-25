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
} from "@aiknew/shared-api-decorators"
import { DictDto } from "./dto/dict.dto"
import { PaginationResponseDto } from "@aiknew/shared-api-dtos"
import { CreateDictDto } from "./dto/create-dict.dto"
import { UpdateDictDto } from "./dto/update-dict.dto"
import { DictService } from "./dict.service"
import { QueryDictDto } from "./dto/query-dict.dto"

@PermissionGroup({ name: "dict.dictManagement" })
@Controller("dict")
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Permission({ key: "dict:pagination", name: "dict.dictPagination" })
  @Get()
  @AppApiPaginationResponse(DictDto)
  async pagination(
    @Query() query: QueryDictDto,
  ): Promise<PaginationResponseDto<DictDto[]>> {
    return this.dictService.pagination(query)
  }

  @Permission({ key: "dict:create", name: "dict.dictCreate" })
  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateDictDto) {
    return this.dictService.createOne(data)
  }

  @Permission({ key: "dict:update", name: "dict.dictUpdate" })
  @Patch(":id")
  @AppApiOkResponse()
  async updateOne(@Param("id") id: string, @Body() data: UpdateDictDto) {
    return this.dictService.updateOne(id, data)
  }

  @Permission({ key: "dict:delete", name: "dict.dictDelete" })
  @Delete(":id")
  @AppApiOkResponse()
  async deleteOne(@Param("id") id: string) {
    return this.dictService.deleteOne(id)
  }
}
