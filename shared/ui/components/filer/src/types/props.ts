import type {
  ICreateUploadFileGroup,
  IUpdateUploadFile,
  IUploadFileGroup,
  IUploadFile,
} from '@aiknew/shared-types'
import type { Ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'

export interface SharedProps {
  uploadUrl: string
  uploadHeaders: Record<string, string>
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
