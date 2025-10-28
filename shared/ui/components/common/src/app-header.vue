<script lang="ts" setup>
import AppRoutePath from "./app-route-path.vue"
import { type RouteLocationNormalizedLoadedGeneric } from "vue-router"
import { type Ref } from "vue"
import { RotateCw, ListCollapse } from "lucide-vue-next"
import AppIcon from "./app-icon.vue"

export interface Props {
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
  expandMenu: boolean
  showExpandBtn?: boolean
}

const {
  expandMenu = true,
  currentRoute,
  showExpandBtn = true,
} = defineProps<Props>()

defineEmits(["update:expandMenu", "refresh"])
</script>

<template>
  <header
    class="bg-theme-bg border-theme-border-light flex h-[70px] min-h-10 items-center border-b p-3"
  >
    <!-- menu expand button -->
    <div
      v-show="showExpandBtn"
      class="text-theme-text-primary relative top-[1px] flex cursor-pointer items-center justify-center"
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
    <AppIcon class="relative ml-1.5 sm:ml-0" @click="$emit('refresh')">
      <RotateCw :size="19" />
    </AppIcon>

    <!-- operations -->
    <div class="ml-auto flex items-center">
      <slot name="operations"></slot>
    </div>
  </header>
</template>
