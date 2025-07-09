import { ICreateUploadFileGroup } from '@aiknew/shared-types'
import { IsNumber, IsString } from 'class-validator'

export class CreateUploadFileGroupDto implements ICreateUploadFileGroup {
  @IsString()
  groupName: string

  @IsString()
  parentId: string

  @IsNumber()
  order: number
}
