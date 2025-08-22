import { FileStorageStatus, StorageType } from '@aiknew/shared-admin-db'
import { ApiProperty } from '@nestjs/swagger'

export class FileStorageDto {
  id: string

  name: string

  hostname: string

  @ApiProperty({
    enumName: 'FileStorageStatus',
    enum: FileStorageStatus,
  })
  status: FileStorageStatus

  @ApiProperty({ enumName: 'StorageType', enum: StorageType })
  type: StorageType

  priority: number

  accessKey: string | null

  secretKey: string | null

  endpoint: string | null

  bucket: string | null

  createdAt: Date

  updatedAt: Date
}
