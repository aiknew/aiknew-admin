import { i18n } from "../../i18n";
import { defineRouteItem, RouteType } from "../../types";

export const articleManagement = defineRouteItem({
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
})