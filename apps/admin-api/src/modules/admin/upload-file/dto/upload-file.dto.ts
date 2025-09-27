import {
  FileStatus,
  UploadFileChannel,
  FileStorageStatus,
  StorageType,
} from '@aiknew/shared-admin-db'
import type { IUploadFile } from '@aiknew/shared-types'
import { ApiProperty } from '@nestjs/swagger'

class CorrespondingFileStorage {
  @ApiProperty({ enumName: 'StorageType', enum: StorageType })
  type: StorageType

  @ApiProperty({ enumName: 'FileStorageStatus', enum: FileStorageStatus })
  status: FileStorageStatus

  hostname: string

  name: string

  bucket: string | null

  @ApiProperty({ type: 'string' })
  createdAt: Date | string

  @ApiProperty({ type: 'string' })
  updatedAt: Date | string
}

export class UploadFileDto implements IUploadFile {
  id: string

  @ApiProperty({
    enumName: 'UploadFileChannel',
    enum: UploadFileChannel,
  })
  channel: UploadFileChannel

  fileName: string

  filePath: string

  fileExt: string

  fileSize: number

  groupId: string | null

  mime: string

  originalName: string

  uploaderId: string

  uploader: {
    userName: string
  }

  storage: CorrespondingFileStorage

  order: number

  @ApiProperty({ enumName: 'FileStatus', enum: FileStatus })
  status: FileStatus

  @ApiProperty({ type: 'string' })
  createdAt: Date | string

  @ApiProperty({ type: 'string' })
  updatedAt: Date | string
}
