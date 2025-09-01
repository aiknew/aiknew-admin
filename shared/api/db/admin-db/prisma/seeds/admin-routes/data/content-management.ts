import { AdminRouteItem } from '../types'
import { RouteType } from '../../../../src/prisma-client'
import { i18n } from '../i18n'

export const contentManagement: AdminRouteItem = {
  icon: 'Collection',
  path: '/content',
  redirect: '/content/file',
  type: RouteType.GROUP,
  name: i18n.contentManagement,
  children: [
    {
      name: i18n.fileManagement,
      type: RouteType.SMALL_GROUP,
      children: [
        {
          component: 'content/file/file-resources',
          icon: 'Picture',
          path: '/content/file',
          type: RouteType.MENU,
          name: i18n.fileManagement,
          children: [
            {
              key: 'upload-file',
              type: RouteType.BUTTON,
              name: i18n.uploadFiles,
            },
            {
              key: 'edit-file',
              type: RouteType.BUTTON,
              name: i18n.editFile,
            },
            {
              key: 'delete-file',
              type: RouteType.BUTTON,
              name: i18n.deleteFiles,
            },
            {
              key: 'add-group',
              type: RouteType.BUTTON,
              name: i18n.addFileGroup,
            },
            {
              key: 'edit-group',
              type: RouteType.BUTTON,
              name: i18n.editFileGroup,
            },
            {
              key: 'delete-group',
              type: RouteType.BUTTON,
              name: i18n.deleteFileGroup,
            },
          ],
        },
      ]
    },
    {
      type: RouteType.SMALL_GROUP,
      name: i18n.articleManagement,
      children: [
        {
          component: 'content/article-category/article-category',
          icon: 'Collection',
          path: '/content/article-category/list',
          type: RouteType.MENU,
          name: i18n.articleCategoryList,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
            },
          ],
        },
        {
          component: 'content/article/article',
          icon: 'Memo',
          path: '/content/article/list',
          type: RouteType.MENU,
          name: i18n.articleList,
          children: [
            {
              key: 'add',
              type: RouteType.BUTTON,
              name: i18n.new,
            },
            {
              key: 'edit',
              type: RouteType.BUTTON,
              name: i18n.edit,
            },
            {
              key: 'delete',
              type: RouteType.BUTTON,
              name: i18n.delete,
            },
          ],
        },
      ],
    },
  ],
} as const
