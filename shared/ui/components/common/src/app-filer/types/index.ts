/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Ref } from "vue"

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
          currentGroupId: string | undefined | null
        },
      ) => Promise<string> | string)
}

export type Storages = UploadStorage[]

export interface PermissionOpts {
  showEditFile?: boolean
  showEditGroup?: boolean
  showDeleteFile?: boolean
  showDeleteGroup?: boolean
  showUploadFile?: boolean
  showAddGroup?: boolean
}

export interface ListPermissions
  extends Pick<
    PermissionOpts,
    "showEditFile" | "showEditGroup" | "showDeleteFile" | "showDeleteGroup"
  > {}

export interface OperationPermissions
  extends Pick<
    PermissionOpts,
    "showDeleteFile" | "showUploadFile" | "showAddGroup"
  > {}
