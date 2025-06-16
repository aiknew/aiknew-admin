import { IsNumber, IsString } from 'class-validator'

export class CreateUploadFileGroupDto {
  @IsString()
  groupName: string

  @IsString()
  parentId: string

  @IsNumber()
  order: number
}
