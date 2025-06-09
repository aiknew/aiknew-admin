import { Module } from '@nestjs/common'
import { UploadFileGroupController } from './upload-file-group.controller'
import { UploadFileGroupService } from './upload-file-group.service'

@Module({
  controllers: [UploadFileGroupController],
  providers: [UploadFileGroupService],
  exports: [UploadFileGroupService],
})
export class UploadFileGroupModule {}
