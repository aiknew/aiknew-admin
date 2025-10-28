import type { RouteRecordRaw } from "vue-router"

export const inherentRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    meta: { hidden: true, translations: [] },
    component: () => import("@/views/admin-login.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    meta: { hidden: true, translations: [] },
    component: () => import("@/views/not-found.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    meta: { hidden: true, translations: [] },
    redirect: "/404",
  },
]
