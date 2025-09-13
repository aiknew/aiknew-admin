import { AdminRouteItem } from '../types'
import { RouteType } from '../../../../src/prisma-client'
import { i18n } from '../i18n'

export const contentManagement: AdminRouteItem = {
  icon: 'Collection',
  path: '/content',
  redirect: '/content/file',
  type: RouteType.GROUP,
  name: i18n.contentManagement,
  order: 200,
  children: [
    {
      name: i18n.fileManagement,
      type: RouteType.SMALL_GROUP,
      order: 100,
      children: [
        {
          component: 'content/file/file-resources',
          icon: 'Picture',
          path: '/content/file',
          type: RouteType.MENU,
          name: i18n.fileManagement,
          permissions: ['upload-file:filesAndGroups', 'upload-file-group:findChildren'],
          order: 101,
          children: [
            {
              key: 'upload-file',
              type: RouteType.BUTTON,
              name: i18n.uploadFiles,
              permissions: ['upload-file:create'],
            },
            {
              key: 'edit-file',
              type: RouteType.BUTTON,
              name: i18n.editFile,
              permissions: ['upload-file:update'],
            },
            {
              key: 'delete-file',
              type: RouteType.BUTTON,
              name: i18n.deleteFiles,
              permissions: ['upload-file:delete'],
            },
            {
              key: 'add-group',
              type: RouteType.BUTTON,
              name: i18n.addFileGroup,
              permissions: ['upload-file-group:create'],
            },
            {
              key: 'edit-group',
              type: RouteType.BUTTON,
              name: i18n.editFileGroup,
              permissions: ['upload-file-group:update'],
            },
            {
              key: 'delete-group',
              type: RouteType.BUTTON,
              name: i18n.deleteFileGroup,
              permissions: ['upload-file-group:delete'],
            },
          ],
        },
      ]
    },
    {
      type: RouteType.SMALL_GROUP,
      name: i18n.articleManagement,
      order: 102,
      children: [
        {
          component: 'content/article-category/article-category',
          icon: 'Collection',
          path: '/content/article-category/list',
          type: RouteType.MENU,
          name: i18n.articleCategoryList,
          permissions: ['article-category:getAll', 'article-category:detail'],
          order: 103,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
              permissions: ['article-category:create']
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
              permissions: ['article-category:update']
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
              permissions: ['article-category:delete']
            },
          ],
        },
        {
          component: 'content/article/article-list',
          icon: 'Memo',
          path: '/content/article/list',
          type: RouteType.MENU,
          name: i18n.articleList,
          permissions: ['article:pagination', 'article:detail'],
          order: 104,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
              permissions: ['article:create']
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
              permissions: ['article:update']
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
              permissions: ['article:delete']
            },
          ],
        },
      ],
    },
  ],
} as const
