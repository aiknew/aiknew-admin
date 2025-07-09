import { IsNumber, IsOptional, IsString } from 'class-validator'
import type { IUpdateUploadFile } from '@aiknew/shared-types'

export class UpdateUploadFileDto implements IUpdateUploadFile {
  @IsOptional()
  @IsString()
  groupId?: string

  @IsOptional()
  @IsString()
  originalName?: string

  @IsOptional()
  @IsNumber()
  order?: number
}
