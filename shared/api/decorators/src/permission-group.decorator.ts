import { SetMetadata } from "@nestjs/common"

export const PERMISSION_GROUP_DECORATOR_KEY = "PERMISSION_GROUP_DECORATOR_KEY"

export type PermissionGroupMetaData = {
  name: string
}

export const PermissionGroup = (meta: PermissionGroupMetaData) =>
  SetMetadata(PERMISSION_GROUP_DECORATOR_KEY, meta)
