<script lang="ts" setup>
import AppRoutePath from './app-route-path.vue'
import { type RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { type Ref } from 'vue'
import { RotateCw, ListCollapse } from 'lucide-vue-next'
import AppIcon from './app-icon.vue'

export interface Props {
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
  expandMenu: boolean
}

const { expandMenu = true, currentRoute } = defineProps<Props>()

defineEmits(['update:expandMenu', 'refresh'])
</script>

<template>
  <header
    class="bg-theme-bg h-[70px] flex min-h-10 items-center p-3 border-b border-theme-border-light"
  >
    <!-- menu expand button -->
    <div
      class="flex cursor-pointer items-center justify-center relative top-[1px] text-theme-text-primary"
      @click="$emit('update:expandMenu', !expandMenu)"
    >
      <AppIcon v-show="!expandMenu">
        <ListCollapse :size="20" />
      </AppIcon>

      <AppIcon v-show="expandMenu">
        <ListCollapse style="transform: rotate(180deg)" :size="20" />
      </AppIcon>
    </div>

    <!-- route path -->
    <AppRoutePath class="hidden sm:block" :current-route />

    <!-- refresh button -->
    <AppIcon class="ml-1.5 sm:ml-0 relative" @click="$emit('refresh')">
      <RotateCw :size="19" />
    </AppIcon>

    <!-- operations -->
    <div class="ml-auto flex items-center">
      <slot name="operations"></slot>
    </div>
  </header>
</template>
