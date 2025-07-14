import { PartialType } from '@nestjs/swagger'
import { CreateFileStorageDto } from './create-file-storage.dto'

export class UpdateFileStorageDto extends PartialType(CreateFileStorageDto) {}
