import { RouteType, RequestMethod } from '../../prisma'
import { t } from '../../util'
import { RouteItem } from '../types'

const setting: RouteItem[] = [
  {
    routeName: t('admin-route.settings.title'),
    type: RouteType.GROUP,
    path: '/settings',
    icon: 'Setting',
    redirect: '/settings/admin-user',
    children: [
      {
        routeName: t('admin-route.adminUsers.title'),
        component: 'settings/admin-user/admin-user',
        icon: 'User',
        type: RouteType.MENU,
        path: '/settings/admin-user',
        apis: {
          create: [
            {
              api: {
                connect: {
                  url_method: {
                    url: '/admin/admin-user',
                    method: RequestMethod.GET,
                  },
                },
              },
            },
            {
              api: {
                connect: {
                  url_method: {
                    url: '/admin/admin-role/all',
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
                        url: '/admin/admin-user',
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
                        url: '/admin/admin-user/:id',
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
                        url: '/admin/admin-user/:id',
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
        routeName: t('admin-route.authSettings.title'),
        type: RouteType.SMALL_GROUP,
        path: '/settings/permission',
        redirect: '/settings/permission/admin-role',
        children: [
          {
            routeName: t('admin-route.roleSettings.title'),
            component: 'settings/permissions/admin-role/admin-role',
            icon: 'Avatar',
            type: RouteType.MENU,
            path: '/settings/permissions/admin-role',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/admin-role',
                        method: RequestMethod.GET,
                      },
                    },
                  },
                },
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/admin-route/all',
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
                            url: '/admin/admin-role',
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
                            url: '/admin/admin-role/:id',
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
                            url: '/admin/admin-role/:id',
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
            routeName: t('admin-route.authSettings.menuSettings'),
            component: 'settings/permissions/admin-route/admin-route',
            type: RouteType.MENU,
            icon: 'Operation',
            path: '/settings/permissions/admin-route',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/admin-route/all',
                        method: RequestMethod.GET,
                      },
                    },
                  },
                },
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/admin-api/all',
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
                            url: '/admin/admin-route',
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
                            url: '/admin/admin-route/:id',
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
                            url: '/admin/admin-route/:id',
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
            routeName: t('admin-route.apiSettings'),
            component: 'settings/permissions/admin-api/admin-api',
            type: RouteType.MENU,
            icon: 'Document',
            path: '/settings/permissions/admin-api',
            apis: {
              create: [
                {
                  api: {
                    connect: {
                      url_method: {
                        url: '/admin/admin-api/all',
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
                            url: '/admin/admin-api',
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
                            url: '/admin/admin-api/:id',
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
                            url: '/admin/admin-api/:id',
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
        ],
      },
    ],
  },
]

export default setting
