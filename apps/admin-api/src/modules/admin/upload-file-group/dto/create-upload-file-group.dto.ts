import { ICreateUploadFileGroup } from "@aiknew/shared-types"
import { IsNumber, IsString, ValidateIf } from "class-validator"

export class CreateUploadFileGroupDto implements ICreateUploadFileGroup {
  @IsString()
  groupName: string

  @ValidateIf((_, value) => value !== null)
  @IsString()
  parentId: string | null

  @IsNumber()
  order: number
}
