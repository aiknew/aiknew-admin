import { FileStorageStatus, StorageType } from '@aiknew/shared-admin-db'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator'

const isSpecificType = (o: any, type: StorageType) => {
  if (o.type) {
    return o.type === type
  }

  return false
}

export class CreateFileStorageDto {
  @IsString()
  name: string

  @IsString()
  hostname: string

  @ApiProperty({ enumName: 'FileStorageStatus', enum: FileStorageStatus })
  @IsEnum(FileStorageStatus)
  @IsOptional()
  status: FileStorageStatus = FileStorageStatus.NORMAL

  @IsNumber()
  @IsOptional()
  priority: number = 10

  @ApiProperty({ enumName: 'StorageType', enum: StorageType })
  @IsEnum(StorageType)
  type: StorageType

  @IsString()
  @ValidateIf((o) => isSpecificType(o, StorageType.S3))
  accessKey?: string

  @IsString()
  @ValidateIf((o) => isSpecificType(o, StorageType.S3))
  secretKey?: string

  @IsString()
  @ValidateIf((o) => isSpecificType(o, StorageType.S3))
  endpoint?: string

  @IsString()
  @ValidateIf((o) => isSpecificType(o, StorageType.S3))
  bucket?: string
}
