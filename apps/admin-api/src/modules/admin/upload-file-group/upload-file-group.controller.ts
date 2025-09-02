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
  Permission,
  PermissionGroup,
  SuccessMsg,
} from '@aiknew/shared-api-decorators'
import { UploadFileGroupDto } from './dto/upload-file-group.dto'
import { t } from '@aiknew/shared-api-utils'

@PermissionGroup({ name: 'upload-file-group.uploadFileGroupManagement' })
@Controller('upload-file-group')
export class UploadFileGroupController {
  constructor(
    private readonly uploadFileGroupService: UploadFileGroupService,
  ) { }

  /**
   * Get all children group by parent group id
   */
  @Permission({ key: 'upload-file-group:findChildren', name: 'upload-file-group.uploadFileGroupFindChildren' })
  @Get(':id')
  @AppApiOkResponse([UploadFileGroupDto])
  async findChildren(@Param('id') id: string) {
    return this.uploadFileGroupService.findChildren(id)
  }

  @Permission({ key: 'upload-file-group:create', name: 'upload-file-group.uploadFileGroupCreate' })
  @SuccessMsg(t('upload-file-group.createSuccess'))
  @Post()
  @AppApiCreatedResponse()
  async create(@Body() createGroupDto: CreateUploadFileGroupDto) {
    await this.uploadFileGroupService.createOne(createGroupDto)
  }

  @Permission({ key: 'upload-file-group:update', name: 'upload-file-group.uploadFileGroupUpdate' })
  @SuccessMsg(t('upload-file-group.updateSuccess'))
  @Patch(':id')
  @AppApiOkResponse()
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateUploadFileGroupDto,
  ) {
    await this.uploadFileGroupService.updateOne(id, updateGroupDto)
  }

  @Permission({ key: 'upload-file-group:delete', name: 'upload-file-group.uploadFileGroupDelete' })
  @SuccessMsg(t('upload-file-group.deleteSuccess'))
  @Delete(':id')
  @AppApiOkResponse()
  async deleteGroup(@Param('id') groupId: string) {
    await this.uploadFileGroupService.deleteOne(groupId)
  }
}
