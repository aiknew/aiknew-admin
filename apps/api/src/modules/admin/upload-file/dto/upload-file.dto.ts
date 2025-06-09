export class UploadFileDto {
  id: string
  channel: number
  fileName: string
  filePath: string
  fileExt: string
  fileSize: number
  groupId: string
  mime: string
  originalName: string
  uploaderId: string
  uploader: {
    userName: string
  }
  order: number
  createdAt: Date
  updatedAt: Date
}
