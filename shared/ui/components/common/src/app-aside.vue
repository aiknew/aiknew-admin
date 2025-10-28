<script lang="ts" setup>
import AppRecursiveMenu from "./app-recursive-menu.vue"
import { ElMenu } from "element-plus"
import { type Ref } from "vue"
import {
  type RouteLocationNormalizedLoadedGeneric,
  type RouteRecordRaw,
} from "vue-router"

export interface Props {
  routes: RouteRecordRaw[]
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
  expand?: boolean
  menuMode?: "vertical" | "horizontal"
  menuMinWidth?: string
}

export interface Emits {
  (e: "update:expand", expand: boolean): void
}

const {
  expand = true,
  routes,
  currentRoute,
  menuMode = "vertical",
  menuMinWidth = "120px",
} = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="bg-theme-bg z-2001 relative flex min-h-screen flex-col">
    <aside
      class="linear border-theme-border-light bg-theme-bg fixed left-0 top-0 z-30 inline-flex h-full shrink-0 grow origin-center flex-col overflow-x-hidden border-r transition md:relative"
      :class="[expand ? '' : '-translate-x-100 md:-translate-x-0']"
    >
      <!-- Title -->
      <slot name="title" :expand></slot>

      <!-- Menu -->
      <div class="px-4">
        <el-menu
          :mode="menuMode"
          class="app-aside-menu border-r-0!"
          :default-active="currentRoute.value.path"
          :collapse="!expand"
          router
        >
          <AppRecursiveMenu :routes :min-width="menuMinWidth" />
        </el-menu>
      </div>
    </aside>

    <!-- Mask layer -->
    <div
      class="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-10 md:hidden"
      :class="[expand ? 'block' : 'hidden']"
      @click="$emit('update:expand', false)"
    ></div>
  </div>
</template>

<style lang="scss">
[id^="el-popper-container-"] {
  position: relative;
  z-index: 5001;
}

.app-aside-menu {
  .el-menu-item {
    min-width: 200px;
  }

  .el-menu-item,
  .el-sub-menu,
  .el-sub-menu__title {
    border-radius: 8px;
  }
}
</style>
