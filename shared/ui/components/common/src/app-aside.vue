<script lang="ts" setup>
import AppRecursiveMenu from './app-recursive-menu.vue'
import { ElMenu } from 'element-plus'
import { type Ref } from 'vue'
import {
  type RouteLocationNormalizedLoadedGeneric,
  type RouteRecordRaw,
} from 'vue-router'

export interface Props {
  routes: RouteRecordRaw[]
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
  expand?: boolean
}

export interface Emits {
  (e: 'update:expand', expand: boolean): void
}

const { expand = true, routes, currentRoute } = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <aside
    class="linear fixed top-0 left-0 z-10 inline-flex h-full min-h-screen shrink-0 origin-center overflow-x-hidden border-r border-theme-border-light bg-theme-bg px-4 transition md:relative"
    :class="[expand ? '' : '-translate-x-100 md:-translate-x-0']"
  >
    <el-menu
      class="border-r-0!"
      :default-active="currentRoute.value.fullPath"
      :collapse="!expand"
      router
    >
      <AppRecursiveMenu :routes />
    </el-menu>
  </aside>

  <div
    class="fixed top-0 left-0 z-5 h-full w-full bg-black opacity-10 md:hidden"
    :class="[expand ? 'block' : 'hidden']"
    @click="$emit('update:expand', false)"
  ></div>
</template>

<style>
.el-menu-item {
  min-width: 200px;
}
</style>
