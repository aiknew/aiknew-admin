<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router"
import { ElMenuItemGroup, ElMenuItem, ElSubMenu, ElIcon } from "element-plus"
import type { CustomRouteMeta } from "@aiknew/shared-ui-types"
import { tField } from "@aiknew/shared-ui-locales"

export interface Props {
  routes: RouteRecordRaw[]
  minWidth?: string
}

const { routes, minWidth = "120px" } = defineProps<Props>()

const hasChildren = (children: Array<RouteRecordRaw> | undefined) =>
  Array.isArray(children) && children.length !== 0
const isSmallGroup = (route: RouteRecordRaw) =>
  route?.meta?.type === "SMALL_GROUP" && !route?.meta?.hidden
const isGroup = (route: RouteRecordRaw) =>
  route?.meta?.type === "GROUP" && !route?.meta?.hidden
const isMenuItem = (route: RouteRecordRaw) =>
  route?.meta?.type === "MENU" &&
  !hasChildren(route.children) &&
  !route?.meta?.hidden
const getRouteName = (meta?: CustomRouteMeta) => {
  const { routeName, translations } = meta ?? {}
  if (translations) {
    return tField(translations, "routeName").value
  }

  return routeName ?? ""
}
</script>

<template>
  <template v-for="route in routes" :key="route.path">
    <!-- small group -->
    <ElMenuItemGroup
      v-if="route.children && route.children.length && isSmallGroup(route)"
      :title="getRouteName(route.meta)"
      :key="route.path"
    >
      <!-- render children menus recursively -->
      <AppRecursiveMenu :routes="route.children" />
    </ElMenuItemGroup>

    <!-- sub menu -->
    <template v-if="route.children && route.children.length && isGroup(route)">
      <ElSubMenu :index="route.path" :key="route.path">
        <template #title>
          <ElIcon v-if="route.meta?.icon">
            <component :is="route.meta.icon" />
          </ElIcon>
          <span class="menu-title">{{ getRouteName(route.meta) }}</span>
        </template>

        <!-- render children menus recursively -->
        <AppRecursiveMenu :routes="route.children" />
      </ElSubMenu>
    </template>

    <!-- normal menu item -->
    <ElMenuItem v-if="isMenuItem(route)" :index="route.path" :key="route.name">
      <ElIcon v-if="route.meta?.icon">
        <component :is="route.meta.icon" />
      </ElIcon>

      <template #title>
        <RouterLink
          :to="route.path"
          class="flex h-full w-full content-start items-center"
        >
          <span class="menu-title">
            {{ getRouteName(route.meta) }}
          </span>
        </RouterLink>
      </template>
    </ElMenuItem>
  </template>
</template>

<style>
.menu-title {
  user-select: none;
  line-height: 1.5;
  min-width: v-bind("minWidth");
}

.el-menu--collapse .menu-title,
.el-menu--collapse .el-menu-item {
  min-width: unset !important;
}

.el-menu--collapse .el-menu-item-group__title {
  padding: 7px 0 7px 0;
}

.el-menu--collapse
  > .el-menu-item-group
  > ul
  > .el-sub-menu
  > .el-sub-menu__title
  > a
  > span,
.el-menu--collapse > .el-menu-item > a > span,
.el-menu--collapse > .el-sub-menu > .el-sub-menu__title > a > span {
  display: inline-block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  width: 0;
}
</style>
