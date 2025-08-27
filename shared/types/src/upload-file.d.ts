import type {
  FileStatus,
  FileStorageStatus,
  StorageType,
  UploadFileChannel,
} from '@aiknew/shared-admin-db'

export interface IFileStorage {
  name: string
  type: StorageType
  status: FileStorageStatus
  hostname: string
  name: string
  createdAt: Date | string
  updatedAt: Date | string
}

export interface IUploadFile {
  id: string
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
  uploader: {
    userName: string
  }
  storage: IFileStorage
  order: number
  createdAt: Date | string
  updatedAt: Date | string
}

export interface IUploadFileGroupPath {
  ancestorId: string
  descendantId: string
  depth: number
  ancestor: { groupName: string }
}

export interface IUploadFileGroup {
  id: string

  groupName: string

  parentId: string

  order: number

  ancestors: IUploadFileGroupPath[]

  createdAt: Date | string

  updatedAt: Date | string
}

export interface IUploadFilesAndGroupsData {
  total: number

  current: number

  pageSize: number

  groupList: IUploadFileGroup[]

  fileList: IUploadFile[]
}

export interface IUpdateUploadFile {
  groupId?: string

  originalName?: string

  order?: number
}

export interface ICreateUploadFileGroup {
  groupName: string

  parentId: string

  order: number
}

export interface IUploadFilesAndGroupsData {
  total: number

  current: number

  pageSize: number

  groupList: IUploadFileGroup[]

  fileList: IUploadFile[]
}

export interface IUploadFileQuery {
  currentPage: number

  pageSize: number

  keyword?: string

  parentId?: string
}
