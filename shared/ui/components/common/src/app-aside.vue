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
    class="linear fixed top-0 left-0 z-10 inline-flex flex-col h-full min-h-screen shrink-0 origin-center overflow-x-hidden border-r border-theme-border-light bg-theme-bg transition md:relative"
    :class="[expand ? '' : '-translate-x-100 md:-translate-x-0']"
  >
    <!-- Logo And App Name -->
    <div class="w-full h-[70px] flex px-[32px] items-center gap-2">
      <span class="size-8 rounded-full bg-theme-primary"></span>
      <Transition name="app-name">
        <span v-show="expand"> Aiknew Admin </span>
      </Transition>
    </div>

    <!-- Menu -->
    <div class="px-4">
      <el-menu
        class="border-r-0!"
        :default-active="currentRoute.value.fullPath"
        :collapse="!expand"
        router
      >
        <AppRecursiveMenu :routes />
      </el-menu>
    </div>
  </aside>

  <!-- Mask layer -->
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

.app-name-enter-active {
  transition: opacity 1.2s ease;
}

.app-name-leave-active {
  transition: opacity 0.7s ease;
}

.app-name-enter-from,
.app-name-leave-to {
  opacity: 0;
}

.app-name-left-from,
.app-name-leave-active {
  left: 72px;
  position: absolute;
  width: 200px;
}
</style>
