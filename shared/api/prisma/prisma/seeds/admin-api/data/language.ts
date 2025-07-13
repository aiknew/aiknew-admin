import { RequestMethod } from '../../prisma'
import { t } from '../../util'
import { ApiItem } from '../types'

const language: ApiItem[] = [
  // Language Settings
  {
    apiName: t('admin-api.language.groupTitle'),
    url: '[/admin/system/lang]',
    method: RequestMethod.GET,
    parentId: '0',
    children: [
      {
        apiName: t('admin-api.language.list'),
        url: '/admin/system/lang',
        method: RequestMethod.GET,
      },
      {
        apiName: t('admin-api.language.create'),
        url: '/admin/system/lang',
        method: RequestMethod.POST,
      },
      {
        apiName: t('admin-api.language.edit'),
        url: '/admin/system/lang/:id',
        method: RequestMethod.PATCH,
      },
      {
        apiName: t('admin-api.language.delete'),
        url: '/admin/system/lang/:id',
        method: RequestMethod.DELETE,
      },
    ],
  },
]

export default language
