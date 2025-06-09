import { RequestMethod } from '@prisma/client'
import { t } from '../../util'
import { ApiItem } from '../types'

const articleCategory: ApiItem[] = [
  {
    apiName: t('article-category.seed.title'),
    url: '[/admin/article-category]',
    method: RequestMethod.GET,
    parentId: '0',
    children: [
      {
        apiName: t('article-category.seed.list'),
        url: '/admin/article-category',
        method: RequestMethod.GET,
      },
      {
        apiName: t('article-category.seed.child'),
        url: '/admin/article-category/:id',
        method: RequestMethod.GET,
      },
      {
        apiName: t('article-category.seed.add'),
        url: '/admin/article-category',
        method: RequestMethod.POST,
      },
      {
        apiName: t('article-category.seed.edit'),
        url: '/admin/article-category/:id',
        method: RequestMethod.PATCH,
      },
      {
        apiName: t('article-category.seed.delete'),
        url: '/admin/article-category/:id',
        method: RequestMethod.DELETE,
      },
    ],
  },
]

export default articleCategory
