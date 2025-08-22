import { FileStatus, UploadFileChannel } from '@aiknew/shared-admin-db'

export class UploadS3FileDto {
  channel: UploadFileChannel
  fileName: string
  filePath: string
  fileExt: string
  fileSize: number
  groupId: string
  mime: string
  originalName: string
  uploaderId: string
  status: FileStatus
  order: number
}
