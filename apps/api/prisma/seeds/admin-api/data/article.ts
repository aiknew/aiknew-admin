import { RequestMethod } from '@prisma/client'
import { t } from '../../util'
import { ApiItem } from '../types'

const article: ApiItem[] = [
  {
    apiName: t('article.seed.title'),
    url: '[/admin/article]',
    method: RequestMethod.GET,
    parentId: '0',
    children: [
      {
        apiName: t('article.seed.list'),
        url: '/admin/article',
        method: RequestMethod.GET,
      },
      {
        apiName: t('article.seed.detail'),
        url: '/admin/article/:id',
        method: RequestMethod.GET,
      },
      {
        apiName: t('article.seed.add'),
        url: '/admin/article',
        method: RequestMethod.POST,
      },
      {
        apiName: t('article.seed.edit'),
        url: '/admin/article/:id',
        method: RequestMethod.PATCH,
      },
      {
        apiName: t('article.seed.delete'),
        url: '/admin/article/:id',
        method: RequestMethod.DELETE,
      },
    ],
  },
]

export default article
