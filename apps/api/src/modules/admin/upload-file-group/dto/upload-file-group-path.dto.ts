export class UploadFileGroupPathDto {
  ancestorId: string
  descendantId: string
  depth: number
  ancestor: { groupName: string }
}
