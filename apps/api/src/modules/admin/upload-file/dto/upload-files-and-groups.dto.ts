import { UploadFileGroupDto } from 'src/modules/admin/upload-file-group/dto/upload-file-group.dto'
import { UploadFileDto } from './upload-file.dto'

export class UploadFilesAndGroupsDto {
  total: number

  current: number

  pageSize: number

  groupList: UploadFileGroupDto[]

  fileList: UploadFileDto[]
}
