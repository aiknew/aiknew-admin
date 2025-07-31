<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { ElMenuItemGroup, ElMenuItem, ElSubMenu, ElIcon } from 'element-plus'
import type { CustomRouteMeta } from '@aiknew/shared-ui-types'
import { tField } from '@aiknew/shared-ui-locales'

export interface Props {
  routes: RouteRecordRaw[]
}

const { routes } = defineProps<Props>()

const hasChildren = (children: Array<RouteRecordRaw> | undefined) =>
  Array.isArray(children) && children.length !== 0
const isSmallGroup = (route: RouteRecordRaw) =>
  route?.meta?.type === 'SMALL_GROUP' && !route?.meta?.hidden
const isGroup = (route: RouteRecordRaw) =>
  route?.meta?.type === 'GROUP' && !route?.meta?.hidden
const isMenuItem = (route: RouteRecordRaw) =>
  route?.meta?.type === 'MENU' &&
  !hasChildren(route.children) &&
  !route?.meta?.hidden
const getRouteName = (meta?: CustomRouteMeta) => {
  const { routeName, translations } = meta ?? {}
  if (translations) {
    return tField(translations, 'routeName').value
  }

  return routeName ?? ''
}
</script>

<template>
  <template v-for="route in routes" :key="route.path">
    <!-- small group -->
    <el-menu-item-group
      v-if="route.children && route.children.length && isSmallGroup(route)"
      :title="getRouteName(route.meta)"
      :key="route.path"
    >
      <!-- render children menus recursively -->
      <AppRecursiveMenu :routes="route.children" />
    </el-menu-item-group>

    <!-- sub menu -->
    <template v-if="route.children && route.children.length && isGroup(route)">
      <el-sub-menu :index="route.path" :key="route.path">
        <template #title>
          <el-icon v-if="route.meta?.icon">
            <component :is="route.meta.icon" />
          </el-icon>
          <span class="menu-title">{{ getRouteName(route.meta) }}</span>
        </template>

        <!-- render children menus recursively -->
        <AppRecursiveMenu :routes="route.children" />
      </el-sub-menu>
    </template>

    <!-- normal menu item -->
    <el-menu-item
      v-if="isMenuItem(route)"
      :index="route.path"
      :key="route.name"
    >
      <router-link
        :to="route.path"
        class="flex w-full h-full items-center content-start"
      >
        <el-icon v-if="route.meta?.icon">
          <component :is="route.meta.icon" />
        </el-icon>
        <span class="menu-title">
          {{ getRouteName(route.meta) }}
        </span>
      </router-link>
    </el-menu-item>
  </template>
</template>

<style>
.menu-title {
  user-select: none;
  line-height: 1.5;
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
