import { PaginationDto, PaginationResponseDto } from '@aiknew/shared-api-dtos'
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
import { FileStorageService } from './file-storage.service'
import { CreateFileStorageDto } from './dto/create-file-storage.dto'
import { UpdateFileStorageDto } from './dto/update-file-storage.dto'
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  AppApiPaginationResponse,
  Permission,
  PermissionGroup,
} from '@aiknew/shared-api-decorators'
import { FileStorageDto } from './dto/file-storage.dto'
import { OmitType } from '@nestjs/swagger'

@PermissionGroup({ name: 'file-storage.fileStorageManagement' })
@Controller('file-storage')
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) { }

  @Permission({ key: 'file-storage:pagination', name: 'file-storage.fileStoragePagination' })
  @Get()
  @AppApiPaginationResponse(FileStorageDto)
  async pagination(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<FileStorageDto[]>> {
    return this.fileStorageService.pagination(paginationDto)
  }

  @Permission({ key: 'file-storage:getAll', name: 'file-storage.fileStorageGetAll' })
  @Get('all')
  @AppApiOkResponse([OmitType(FileStorageDto, ['accessKey', 'secretKey'])])
  async getAll(): Promise<Omit<FileStorageDto, 'accessKey' | 'secretKey'>[]> {
    return this.fileStorageService.getAll()
  }

  @Permission({ key: 'file-storage:create', name: 'file-storage.fileStorageCreate' })
  @Post()
  @AppApiCreatedResponse()
  async createOne(@Body() data: CreateFileStorageDto) {
    return this.fileStorageService.createOne(data)
  }

  @Permission({ key: 'file-storage:update', name: 'file-storage.fileStorageUpdate' })
  @Patch(':id')
  @AppApiOkResponse()
  async updateOne(@Param('id') id: string, @Body() data: UpdateFileStorageDto) {
    return this.fileStorageService.updateOne(id, data)
  }

  @Permission({ key: 'file-storage:delete', name: 'file-storage.fileStorageDelete' })
  @Delete(':id')
  @AppApiOkResponse()
  async deleteOne(@Param('id') id: string) {
    return this.fileStorageService.deleteOne(id)
  }
}
