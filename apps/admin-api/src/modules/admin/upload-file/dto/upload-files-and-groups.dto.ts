import { UploadFileGroupDto } from '../../upload-file-group/dto/upload-file-group.dto'
import { UploadFileDto } from './upload-file.dto'
import type { IUploadFilesAndGroupsData } from '@aiknew/shared-types'

export class UploadFilesAndGroupsDto implements IUploadFilesAndGroupsData {
  total: number

  current: number

  pageSize: number

  groupList: UploadFileGroupDto[]

  fileList: UploadFileDto[]
}
