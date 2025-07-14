import { StorageType } from '@aiknew/shared-api-prisma'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEnum,
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

  @IsBoolean()
  @IsOptional()
  enable?: boolean = false

  @IsEnum(StorageType)
  @ApiProperty({ enumName: 'StorageType', enum: StorageType })
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
