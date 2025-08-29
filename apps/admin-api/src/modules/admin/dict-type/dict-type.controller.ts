import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { DictTypeService } from "./dict-type.service";
import { PaginationDto } from "@aiknew/shared-api-dtos";
import { AppApiCreatedResponse, AppApiOkResponse, AppApiPaginationResponse } from "@aiknew/shared-api-decorators";
import { DictTypeDto } from "./dto/dict-type.dto";
import { PaginationResponseDto } from "@aiknew/shared-api-dtos";
import { CreateDictTypeDto } from "./dto/create-dict-type.dto";
import { UpdateDictTypeDto } from "./dto/update-dict-type.dto";

@Controller('dict-type')
export class DictTypeController {

  constructor(private readonly dictTypeService: DictTypeService) { }

  @Get()
  @AppApiPaginationResponse(DictTypeDto)
  async pagination(@Query() paginationDto: PaginationDto): Promise<PaginationResponseDto<DictTypeDto[]>> {
    return this.dictTypeService.pagination(paginationDto)
  }

  @Get('all')
  @AppApiOkResponse([DictTypeDto])
  async getAll(): Promise<DictTypeDto[]> {
    return this.dictTypeService.getAll()
  }

  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateDictTypeDto) {
    return this.dictTypeService.createOne(data)
  }

  @Patch(":id")
  @AppApiOkResponse()
  async updateOne(@Param("id") id: string, @Body() data: UpdateDictTypeDto) {
    return this.dictTypeService.updateOne(id, data)
  }

  @Delete(":id")
  @AppApiOkResponse()
  async deleteOne(@Param("id") id: string) {
    return this.dictTypeService.deleteOne(id)
  }
}