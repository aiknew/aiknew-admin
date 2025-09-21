import type {
  ICreateUploadFileGroup,
  IUpdateUploadFile,
  IUploadFileGroup,
  IUploadFile,
} from '@aiknew/shared-types'
import type { Ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'

export interface UploadStorage {
  id: string
  name: string
  uploadURL:
  | string
  | ((
    extraFormData: Ref<Record<string, unknown>>,
    uploadHeaders: Ref<Record<string, unknown>>,
    info: {
      selectedStorageId: string | undefined
      currentGroupId: string | undefined
    },
  ) => Promise<string> | string)
}

export interface SharedProps {
  storages: UploadStorage[]
  deleteSelected: (selectedFiles: IUploadFile[]) => Promise<unknown>
  createFileGroup: (data: ICreateUploadFileGroup) => Promise<unknown>
  updateFileGroup: (data: {
    id: string
    body: Partial<ICreateUploadFileGroup>
  }) => Promise<unknown>
  loadGroupNode: (
    currentEditGroupId: Ref<string | undefined>,
    node: Node,
    resolve: (
      data: Omit<IUploadFileGroup, 'updatedAt' | 'createdAt'>[],
    ) => void,
    reject: () => void,
  ) => void
  updateFile: (data: {
    id: string
    body: IUpdateUploadFile
  }) => Promise<unknown>
}