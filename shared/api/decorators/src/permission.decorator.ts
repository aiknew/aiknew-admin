import { SetMetadata } from '@nestjs/common'

export const PERMISSION_KEY = "permission_key"

export type PermissionMetaData = {
  name: string
  key: string
}

export const Permission = (meta: PermissionMetaData) => SetMetadata(PERMISSION_KEY, meta);
