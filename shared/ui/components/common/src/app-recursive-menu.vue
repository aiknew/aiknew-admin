<script setup lang="ts">
// import { useLangStore } from '@/stores/lang'
// import { type AdminRouteTranslations } from '@/types/router'
import type { RouteRecordRaw } from 'vue-router'
import { ElMenuItemGroup, ElMenuItem, ElSubMenu, ElIcon } from 'element-plus'
import { getTranslationField } from '@aiknew/shared-ui-utils'
import type { AdminRouteTranslations } from '@aiknew/shared-ui-types'

export interface Props {
  routes: RouteRecordRaw[]
}

const { routes } = defineProps<Props>()
// const { getTranslationField } = useLangStore()

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
const getRouteName = (translations?: AdminRouteTranslations) => {
  if (translations) {
    return getTranslationField(translations, 'routeName').value
  }

  return ''
}
</script>

<template>
  <template v-for="route in routes" :key="route.path">
    <!-- small group -->
    <el-menu-item-group
      v-if="route.children && route.children.length && isSmallGroup(route)"
      :title="getRouteName(route.meta?.translations)"
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
          <span class="menu-title">{{
            getRouteName(route.meta?.translations)
          }}</span>
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
      <el-icon v-if="route.meta?.icon">
        <component :is="route.meta.icon" />
      </el-icon>
      <span class="menu-title">{{
        getRouteName(route.meta?.translations)
      }}</span>
    </el-menu-item>
  </template>
</template>

<style>
.menu-title {
  user-select: none;
  line-height: 1.5;
}
</style>
