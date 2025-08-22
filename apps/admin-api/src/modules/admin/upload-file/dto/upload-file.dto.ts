import { FileStatus, UploadFileChannel } from '@aiknew/shared-admin-db'
import type { IUploadFile } from '@aiknew/shared-types'
import { ApiProperty } from '@nestjs/swagger'

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

  groupId: string

  mime: string

  originalName: string

  uploaderId: string

  uploader: {
    userName: string
  }

  storage: {
    hostname: string
  }

  order: number

  status: FileStatus

  createdAt: Date

  updatedAt: Date
}
