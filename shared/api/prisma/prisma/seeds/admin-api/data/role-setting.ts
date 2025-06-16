import { RequestMethod } from '@prisma/client'
import { t } from '../../util'
import { ApiItem } from '../types'

const role: ApiItem[] = [
  // Role Settings
  {
    apiName: t('admin-api.adminRole.title'),
    url: '[/admin/admin-role]',
    method: RequestMethod.GET,
    parentId: '0',
    children: [
      {
        apiName: t('admin-api.adminRole.list'),
        url: '/admin/admin-role',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.adminRole.all'),
        url: '/admin/admin-role/all',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.adminRole.add'),
        url: '/admin/admin-role',
        method: RequestMethod.POST,
      },
      {
        apiName: t('admin-api.adminRole.edit'),
        url: '/admin/admin-role/:id',
        method: RequestMethod.PATCH,
      },
      {
        apiName: t('admin-api.adminRole.delete'),
        url: '/admin/admin-role/:id',
        method: RequestMethod.DELETE,
      },
    ],
  },
]

export default role
