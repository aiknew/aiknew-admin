import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { DictTypeService } from "./dict-type.service";
import { PaginationDto } from "@aiknew/shared-api-dtos";
import { AppApiCreatedResponse, AppApiOkResponse, AppApiPaginationResponse, Permission, PermissionGroup } from "@aiknew/shared-api-decorators";
import { DictTypeDto } from "./dto/dict-type.dto";
import { PaginationResponseDto } from "@aiknew/shared-api-dtos";
import { CreateDictTypeDto } from "./dto/create-dict-type.dto";
import { UpdateDictTypeDto } from "./dto/update-dict-type.dto";

@PermissionGroup({ name: 'dict-type.dictTypeManagement' })
@Controller('dict-type')
export class DictTypeController {

  constructor(private readonly dictTypeService: DictTypeService) { }

  @Permission({ key: 'dict-type:pagination', name: 'dict-type.dictTypePagination' })
  @Get()
  @AppApiPaginationResponse(DictTypeDto)
  async pagination(@Query() paginationDto: PaginationDto): Promise<PaginationResponseDto<DictTypeDto[]>> {
    return this.dictTypeService.pagination(paginationDto)
  }

  @Permission({ key: 'dict-type:getAll', name: 'dict-type.dictTypeGetAll' })
  @Get('all')
  @AppApiOkResponse([DictTypeDto])
  async getAll(): Promise<DictTypeDto[]> {
    return this.dictTypeService.getAll()
  }

  @Permission({ key: 'dict-type:create', name: 'dict-type.dictTypeCreate' })
  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateDictTypeDto) {
    return this.dictTypeService.createOne(data)
  }

  @Permission({ key: 'dict-type:update', name: 'dict-type.dictTypeUpdate' })
  @Patch(":id")
  @AppApiOkResponse()
  async updateOne(@Param("id") id: string, @Body() data: UpdateDictTypeDto) {
    return this.dictTypeService.updateOne(id, data)
  }

  @Permission({ key: 'dict-type:delete', name: 'dict-type.dictTypeDelete' })
  @Delete(":id")
  @AppApiOkResponse()
  async deleteOne(@Param("id") id: string) {
    return this.dictTypeService.deleteOne(id)
  }
}