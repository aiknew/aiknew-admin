import { StorageType } from '@aiknew/shared-api-prisma'
import { ApiProperty } from '@nestjs/swagger'

export class FileStorageDto {
  id: string

  name: string

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
