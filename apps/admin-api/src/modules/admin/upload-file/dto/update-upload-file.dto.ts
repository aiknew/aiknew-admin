import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'
import type { IUpdateUploadFile } from '@aiknew/shared-types'

export class UpdateUploadFileDto implements IUpdateUploadFile {
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  groupId?: string | null

  @IsOptional()
  @IsString()
  originalName?: string

  @IsOptional()
  @IsNumber()
  order?: number
}
