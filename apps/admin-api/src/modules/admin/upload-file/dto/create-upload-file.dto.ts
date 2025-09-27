import { Transform } from 'class-transformer'
import { IsOptional, IsString, ValidateIf } from 'class-validator'

export class CreateUploadFileDto {
  @Transform(({ value }) => {
    if (value === 'null') {
      return null
    }

    return value
  })
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsString()
  groupId?: string | null

  @IsString()
  fileStorageId: string
}
