import { RequestMethod } from '@prisma/client'
import { t } from '../../util'
import { ApiItem } from '../types'

const userSetting: ApiItem[] = [
  // Admin User Settings
  {
    apiName: t('admin-api.adminUser.title'),
    url: '[/admin/admin-user]',
    method: RequestMethod.GET,
    parentId: '0',
    children: [
      {
        apiName: t('admin-api.adminUser.list'),
        url: '/admin/admin-user',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.adminUser.add'),
        url: '/admin/admin-user',
        method: RequestMethod.POST,
      },
      {
        apiName: t('admin-api.adminUser.edit'),
        url: '/admin/admin-user/:id',
        method: RequestMethod.PATCH,
      },
      {
        apiName: t('admin-api.adminUser.delete'),
        url: '/admin/admin-user/:id',
        method: RequestMethod.DELETE,
      },
    ],
  },
  // Update Account Info
  {
    apiName: t('admin-api.updateAccount'),
    url: '/admin/auth/update',
    method: RequestMethod.PATCH,
    parentId: '0',
  },
]

export default userSetting
