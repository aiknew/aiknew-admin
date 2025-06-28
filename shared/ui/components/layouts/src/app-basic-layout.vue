<script lang="ts" setup>
import { AppHeader, AppAside } from '@aiknew/shared-ui-components'
import { onMounted, Ref, ref } from 'vue'
import type {
  RouteLocationNormalizedLoadedGeneric,
  RouteRecordRaw,
} from 'vue-router'

interface Props {
  routes: RouteRecordRaw[]
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
}

const { currentRoute, routes } = defineProps<Props>()

const expandMenu = ref(true)
</script>

<template>
  <div class="flex">
    <AppAside v-model:expand="expandMenu" :routes :current-route />

    <div class="flex min-h-[100vh] shrink grow flex-col overflow-hidden">
      <AppHeader v-model:expand-menu="expandMenu" :current-route>
        <template #operations>
          <slot name="operations"></slot>
        </template>
      </AppHeader>

      <main class="w-full shrink grow bg-stone-100 p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
