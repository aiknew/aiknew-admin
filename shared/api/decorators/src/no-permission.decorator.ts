import { SetMetadata } from '@nestjs/common'

export const IS_NO_PERMISSION_KEY = 'isNoPermission'
export const NoPermission = () => SetMetadata(IS_NO_PERMISSION_KEY, true)
