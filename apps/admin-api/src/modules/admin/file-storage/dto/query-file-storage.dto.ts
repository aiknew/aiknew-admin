import { FileStorageStatus, StorageType } from "@aiknew/shared-admin-db"
import { PaginationDto } from "@aiknew/shared-api-dtos"
import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsString } from "class-validator"

export class QueryFileStorageDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  hostname?: string

  @ApiProperty({
    enumName: "FileStorageStatus",
    enum: FileStorageStatus,
  })
  @IsEnum(FileStorageStatus)
  @IsOptional()
  status?: FileStorageStatus

  @ApiProperty({ enumName: "StorageType", enum: StorageType })
  @IsEnum(StorageType)
  @IsOptional()
  type?: StorageType
}
