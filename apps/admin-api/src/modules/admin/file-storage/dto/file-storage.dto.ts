import { StorageType } from '@aiknew/shared-admin-db'
import { ApiProperty } from '@nestjs/swagger'

export class FileStorageDto {
  id: string

  name: string

  hostname: string

  active: boolean

  @ApiProperty({ enumName: 'StorageType', enum: StorageType })
  type: StorageType

  accessKey: string | null

  secretKey: string | null

  endpoint: string | null

  bucket: string | null

  createdAt: Date

  updatedAt: Date
}
