import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUploadFileDto {
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
