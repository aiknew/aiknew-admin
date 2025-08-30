<script lang="ts" setup>
import { AppHeader, AppAside } from '@aiknew/shared-ui-components'
import { nextTick, Ref, ref } from 'vue'
import {
  type RouteLocationNormalizedLoadedGeneric,
  type RouteRecordRaw,
} from 'vue-router'
import { BProgress } from '@bprogress/core'

interface Props {
  routes: RouteRecordRaw[]
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
}

const { currentRoute, routes } = defineProps<Props>()

const expandMenu = ref(true)
const mainKey = ref(0)

const handleRefresh = async () => {
  BProgress.start()
  mainKey.value++

  await nextTick()

  BProgress.done()
}
</script>

<template>
  <div class="flex">
    <AppAside v-model:expand="expandMenu" :routes :current-route />

    <div class="flex min-h-[100vh] shrink grow flex-col overflow-hidden">
      <AppHeader
        v-model:expand-menu="expandMenu"
        :current-route
        @refresh="handleRefresh"
      >
        <template #operations>
          <slot name="operations"></slot>
        </template>
      </AppHeader>

      <slot name="top"></slot>

      <main class="w-full shrink grow p-4 bg-theme-bg-page" :key="mainKey">
        <RouterView />
      </main>
    </div>
  </div>
</template>
