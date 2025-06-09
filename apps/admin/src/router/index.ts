import { createRouter, createWebHistory } from 'vue-router'
import { inherentRoutes, staticRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'Root',
    //   component: () => import('../components/layout/app-basic-layout.vue'),
    //   redirect: '/home',
    //   meta: { type: 'GROUP', translations: [] },
    //   children: [
    //     {
    //       path: '/home',
    //       name: 'Home',
    //       meta: {
    //         type: 'MENU',
    //         icon: 'HomeFilled',
    //         translations: [
    //           { langKey: 'en', routeName: 'Home' },
    //           { langKey: 'zh-CN', routeName: '首页' },
    //           { langKey: 'zh-TW', routeName: '首页' }
    //         ]
    //       },
    //       component: () => import('../views/home-view.vue')
    //     },

    //     {
    //       path: '/settings/admin-user',
    //       name: 'AdminUser',
    //       component: () => import('../views/settings/admin-user/admin-user.vue'),
    //       meta: {
    //         type: 'MENU',
    //         icon: 'HomeFilled',
    //         translations: [
    //           { langKey: 'en', routeName: 'User Setting' },
    //           { langKey: 'zh-CN', routeName: 'User 设置' },
    //           { langKey: 'zh-TW', routeName: 'User 設定' }
    //         ]
    //       }
    //     },

    //     {
    //       path: '/settings/permissions/admin-api',
    //       name: 'AdminApi',
    //       component: () => import('../views/settings/permissions/admin-api/admin-api.vue'),
    //       meta: {
    //         type: 'MENU',
    //         icon: 'HomeFilled',
    //         translations: [
    //           { langKey: 'en', routeName: 'API Setting' },
    //           { langKey: 'zh-CN', routeName: 'API 设置' },
    //           { langKey: 'zh-TW', routeName: 'API 設定' }
    //         ]
    //       }
    //     },

    //     {
    //       path: '/settings/permissions/admin-route',
    //       name: 'AdminRoute',
    //       component: () => import('../views/settings/permissions/admin-route/admin-route.vue'),
    //       meta: {
    //         type: 'MENU',
    //         icon: 'HomeFilled',
    //         translations: [
    //           { langKey: 'en', routeName: 'Route Setting' },
    //           { langKey: 'zh-CN', routeName: 'Route 设置' },
    //           { langKey: 'zh-TW', routeName: 'Route 設定' }
    //         ]
    //       }
    //     },

    //     {
    //       path: '/settings/permissions/admin-role',
    //       name: 'AdminRole',
    //       component: () => import('../views/settings/permissions/admin-role/admin-role.vue'),
    //       meta: {
    //         type: 'MENU',
    //         icon: 'HomeFilled',
    //         translations: [
    //           { langKey: 'en', routeName: 'Role Setting' },
    //           { langKey: 'zh-CN', routeName: 'Role 设置' },
    //           { langKey: 'zh-TW', routeName: 'Role 設定' }
    //         ]
    //       }
    //     },

    //     ...staticRoutes
    //   ]
    // },

    ...inherentRoutes
  ]
})

export default router
