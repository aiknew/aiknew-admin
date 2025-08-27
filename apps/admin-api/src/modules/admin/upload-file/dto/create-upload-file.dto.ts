import { IsOptional, IsString } from 'class-validator'

export class CreateUploadFileDto {
  @IsOptional()
  @IsString()
  groupId?: string

  @IsString()
  fileStorageId: string
}
