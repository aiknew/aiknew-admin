import { RequestMethod } from '@prisma/client'
import { t } from '../../util'
import { ApiItem } from '../types'

const api: ApiItem[] = [
  // API Settings
  {
    apiName: t('admin-api.adminApi.title'),
    url: '[/admin/admin-api]',
    method: RequestMethod.GET,
    parentId: '0',
    children: [
      {
        apiName: t('admin-api.adminApi.list'),
        url: '/admin/admin-api',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.adminApi.all'),
        url: '/admin/admin-api/all',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.adminApi.add'),
        url: '/admin/admin-api',
        method: RequestMethod.POST,
      },
      {
        apiName: t('admin-api.adminApi.edit'),
        url: '/admin/admin-api/:id',
        method: RequestMethod.PATCH,
      },
      {
        apiName: t('admin-api.adminApi.delete'),
        url: '/admin/admin-api/:id',
        method: RequestMethod.DELETE,
      },
    ],
  },
]

export default api
