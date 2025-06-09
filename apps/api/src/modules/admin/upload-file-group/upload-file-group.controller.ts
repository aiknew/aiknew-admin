import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { UploadFileGroupService } from './upload-file-group.service'
import { CreateUploadFileGroupDto } from './dto/create-upload-file-group.dto'
import { UpdateUploadFileGroupDto } from './dto/update-upload-file-group.dto'
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  SuccessMsg,
} from 'src/common/decorators'
import { UploadFileGroupDto } from './dto/upload-file-group.dto'
import { t } from 'src/common/utils/translation'

@Controller('upload-file-group')
export class UploadFileGroupController {
  constructor(
    private readonly uploadFileGroupService: UploadFileGroupService,
  ) {}

  /**
   * Get all children group by parent group id
   */
  @Get(':id')
  @AppApiOkResponse([UploadFileGroupDto])
  async findChildren(@Param('id') id: string) {
    return this.uploadFileGroupService.findChildren(id)
  }

  @SuccessMsg(t('upload-file-group.createSuccess'))
  @Post()
  @AppApiCreatedResponse()
  async create(@Body() createGroupDto: CreateUploadFileGroupDto) {
    await this.uploadFileGroupService.createOne(createGroupDto)
  }

  @SuccessMsg(t('upload-file-group.updateSuccess'))
  @Patch(':id')
  @AppApiOkResponse()
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateUploadFileGroupDto,
  ) {
    await this.uploadFileGroupService.updateOne(id, updateGroupDto)
  }

  @SuccessMsg(t('upload-file-group.deleteSuccess'))
  @Delete(':id')
  @AppApiOkResponse()
  async deleteGroup(@Param('id') groupId: string) {
    await this.uploadFileGroupService.deleteOne(groupId)
  }
}
