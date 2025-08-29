import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { AppApiCreatedResponse, AppApiOkResponse, AppApiPaginationResponse } from "@aiknew/shared-api-decorators";
import { DictDto } from "./dto/dict.dto";
import { PaginationResponseDto } from "@aiknew/shared-api-dtos";
import { CreateDictDto } from "./dto/create-dict.dto";
import { UpdateDictDto } from "./dto/update-dict.dto";
import { DictService } from "./dict.service";
import { QueryDictDto } from "./dto/query-dict.dto";

@Controller('dict')
export class DictController {

  constructor(private readonly dictService: DictService) { }

  @Get()
  @AppApiPaginationResponse(DictDto)
  async pagination(@Query() query: QueryDictDto): Promise<PaginationResponseDto<DictDto[]>> {
    return this.dictService.pagination(query)
  }

  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateDictDto) {
    return this.dictService.createOne(data)
  }

  @Patch(":id")
  @AppApiOkResponse()
  async updateOne(@Param("id") id: string, @Body() data: UpdateDictDto) {
    return this.dictService.updateOne(id, data)
  }

  @Delete(":id")
  @AppApiOkResponse()
  async deleteOne(@Param("id") id: string) {
    return this.dictService.deleteOne(id)
  }
}