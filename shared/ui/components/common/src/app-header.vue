<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { Expand, Fold, Refresh } from '@element-plus/icons-vue'
import AppRoutePath from './app-route-path.vue'
import { type RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { type Ref } from 'vue'

export interface Props {
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
  expandMenu: boolean
}

const { expandMenu = true, currentRoute } = defineProps<Props>()

defineEmits(['update:expandMenu', 'refresh'])
</script>

<template>
  <header
    class="bg-white-100 flex min-h-10 items-center p-3 border-b border-theme-border-light"
  >
    <!-- logo -->
    <!-- <div class="mr-1 flex size-9 items-center justify-center border md:hidden">
      logo
    </div> -->

    <!-- menu expand button -->
    <div
      class="flex cursor-pointer items-center justify-center"
      @click="$emit('update:expandMenu', !expandMenu)"
    >
      <el-icon v-show="!expandMenu" :size="26">
        <Expand />
      </el-icon>
      <el-icon v-show="expandMenu" :size="26">
        <Fold />
      </el-icon>
    </div>

    <!-- route path -->
    <AppRoutePath class="hidden sm:block" :current-route />

    <!-- refresh button -->
    <el-icon class="cursor-pointer ml-1.5 sm:ml-0" @click="$emit('refresh')"
      ><Refresh
    /></el-icon>

    <!-- operations -->
    <div class="ml-auto flex items-center">
      <slot name="operations"></slot>
    </div>
  </header>
</template>
