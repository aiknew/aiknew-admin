import { UploadFileGroupDto } from 'src/modules/admin/upload-file-group/dto/upload-file-group.dto'
import { UploadFileDto } from './upload-file.dto'
import type { IUploadFilesAndGroupsData } from '@aiknew/shared-types'
import { StorageType } from '@aiknew/shared-api-prisma'
import { ApiProperty } from '@nestjs/swagger'

class FileStorage {
  id: string

  @ApiProperty({ enumName: 'StorageType', enum: StorageType })
  type: StorageType

  hostname: string

  active: boolean

  bucket: string | null
}

export class UploadFilesAndGroupsDto implements IUploadFilesAndGroupsData {
  total: number

  current: number

  pageSize: number

  groupList: UploadFileGroupDto[]

  fileList: UploadFileDto[]

  storage: FileStorage
}
