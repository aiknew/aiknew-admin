import { UploadFileGroupPathDto } from "./upload-file-group-path.dto"

export class UploadFileGroupDto {
  id: string

  groupName: string

  parentId: string | null

  order: number

  ancestors: UploadFileGroupPathDto[]

  createdAt: Date

  updatedAt: Date
}
