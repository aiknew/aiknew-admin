import { RequestMethod } from '@prisma/client'
import { t } from '../../util'
import { ApiItem } from '../types'

const route: ApiItem[] = [
  // Route Settings
  {
    apiName: t('admin-api.adminRoute.title'),
    url: '[/admin/admin-route]',
    method: RequestMethod.GET,
    parentId: '0',
    children: [
      {
        apiName: t('admin-api.adminRoute.list'),
        url: '/admin/admin-route',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.adminRoute.all'),
        url: '/admin/admin-route/all',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.adminRoute.add'),
        url: '/admin/admin-route',
        method: RequestMethod.POST,
      },
      {
        apiName: t('admin-api.adminRoute.edit'),
        url: '/admin/admin-route/:id',
        method: RequestMethod.PATCH,
      },
      {
        apiName: t('admin-api.adminRoute.delete'),
        url: '/admin/admin-route/:id',
        method: RequestMethod.DELETE,
      },
    ],
  },
]

export default route
