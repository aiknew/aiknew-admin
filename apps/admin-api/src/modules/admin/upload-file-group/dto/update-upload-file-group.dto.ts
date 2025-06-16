import { PartialType } from '@nestjs/swagger'
import { CreateUploadFileGroupDto } from './create-upload-file-group.dto'

export class UpdateUploadFileGroupDto extends PartialType(
  CreateUploadFileGroupDto,
) {}
