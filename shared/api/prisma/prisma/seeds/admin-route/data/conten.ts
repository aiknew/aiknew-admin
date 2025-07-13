import { RouteType, RequestMethod } from '../../prisma'
import { t } from '../../util'
import { RouteItem } from '../types'

const content: RouteItem[] = [
  {
    routeName: t('admin-route.content.title'),
    type: RouteType.GROUP,
    path: '/content',
    icon: 'Collection',
    redirect: '/content/file',
    children: [
      {
        routeName: t('admin-route.content.file.title'),
        type: RouteType.MENU,
        path: '/content/file',
        icon: 'Picture',
        component: 'content/file/file-resources',
        apis: {
          create: [
            {
              api: {
                connect: {
                  url_method: {
                    url: '/admin/upload-file/filesAndGroups',
                    method: RequestMethod.GET,
                  },
                },
              },
            },
            {
              api: {
                connect: {
                  url_method: {
                    url: '/admin/upload-file-group/:id',
                    method: RequestMethod.GET,
                  },
                },
              },
            },
          ],
        },
        children: [
          {
            routeName: t('admin-route.content.file.uploadFile'),
            type: RouteType.BUTTON,
            key: 'upload-file',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/upload-file',
                        method: RequestMethod.POST,
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            routeName: t('admin-route.content.file.editFile'),
            type: RouteType.BUTTON,
            key: 'edit-file',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/upload-file/:id',
                        method: RequestMethod.PATCH,
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            routeName: t('admin-route.content.file.deleteFile'),
            type: RouteType.BUTTON,
            key: 'delete-file',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/upload-file/:id',
                        method: RequestMethod.DELETE,
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            routeName: t('admin-route.content.file.addGroup'),
            type: RouteType.BUTTON,
            key: 'add-group',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/upload-file-group',
                        method: RequestMethod.POST,
                      },
                    },
                  },
                },
              ],
            },
          },

          {
            routeName: t('admin-route.content.file.editGroup'),
            type: RouteType.BUTTON,
            key: 'edit-group',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/upload-file-group/:id',
                        method: RequestMethod.PATCH,
                      },
                    },
                  },
                },
              ],
            },
          },

          {
            routeName: t('admin-route.content.file.deleteGroup'),
            type: RouteType.BUTTON,
            key: 'delete-group',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/upload-file-group/:id',
                        method: RequestMethod.DELETE,
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      {
        routeName: t('admin-route.content.articleManagement.title'),
        type: RouteType.SMALL_GROUP,
        path: '/content/article-category',
        redirect: '/content/article-category/list',
        children: [
          {
            routeName: t('admin-route.content.articleManagement.category'),
            type: RouteType.MENU,
            path: '/content/article-category/list',
            icon: 'Collection',
            component: 'content/article-category/article-category-list',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/article-category',
                        method: RequestMethod.GET,
                      },
                    },
                  },
                },
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/article-category/:id',
                        method: RequestMethod.GET,
                      },
                    },
                  },
                },
              ],
            },

            children: [
              {
                routeName: t('admin-route.common.add'),
                key: 'add',
                type: RouteType.BUTTON,
                apis: {
                  create: [
                    {
                      api: {
                        connect: {
                          url_method: {
                            url: '/admin/article-category',
                            method: RequestMethod.POST,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                routeName: t('admin-route.common.edit'),
                key: 'edit',
                type: RouteType.BUTTON,
                apis: {
                  create: [
                    {
                      api: {
                        connect: {
                          url_method: {
                            url: '/admin/article-category/:id',
                            method: RequestMethod.PATCH,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                routeName: t('admin-route.common.delete'),
                key: 'delete',
                type: RouteType.BUTTON,
                apis: {
                  create: [
                    {
                      api: {
                        connect: {
                          url_method: {
                            url: '/admin/article-category/:id',
                            method: RequestMethod.DELETE,
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },

          {
            routeName: t('admin-route.content.articleManagement.article'),
            type: RouteType.MENU,
            path: '/content/article/list',
            icon: 'Memo',
            component: 'content/article/article-list',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/article',
                        method: RequestMethod.GET,
                      },
                    },
                  },
                },
              ],
            },
            children: [
              {
                routeName: t('admin-route.common.add'),
                key: 'add',
                type: RouteType.BUTTON,
                apis: {
                  create: [
                    {
                      api: {
                        connect: {
                          url_method: {
                            url: '/admin/article',
                            method: RequestMethod.POST,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                routeName: t('admin-route.common.edit'),
                key: 'edit',
                type: RouteType.BUTTON,
                apis: {
                  create: [
                    {
                      api: {
                        connect: {
                          url_method: {
                            url: '/admin/article/:id',
                            method: RequestMethod.PATCH,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                routeName: t('admin-route.common.delete'),
                key: 'delete',
                type: RouteType.BUTTON,
                apis: {
                  create: [
                    {
                      api: {
                        connect: {
                          url_method: {
                            url: '/admin/article/:id',
                            method: RequestMethod.DELETE,
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },

          {
            routeName: t('admin-route.content.articleManagement.articleDetail'),
            type: RouteType.MENU,
            path: '/content/article/detail',
            hidden: true,
            component: 'content/article/article-detail',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/article/:id',
                        method: RequestMethod.GET,
                      },
                    },
                  },
                },
              ],
            },
            children: [
              {
                routeName: t('admin-route.common.add'),
                key: 'add',
                type: RouteType.BUTTON,
                apis: {
                  create: [
                    {
                      api: {
                        connect: {
                          url_method: {
                            url: '/admin/article',
                            method: RequestMethod.POST,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                routeName: t('admin-route.common.edit'),
                key: 'edit',
                type: RouteType.BUTTON,
                apis: {
                  create: [
                    {
                      api: {
                        connect: {
                          url_method: {
                            url: '/admin/article/:id',
                            method: RequestMethod.PATCH,
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

export default content
