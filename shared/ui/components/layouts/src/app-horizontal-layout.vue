<script lang="ts" setup>
import { AppHeader, AppAside } from '@aiknew/shared-ui-components'
import { nextTick, type Ref, ref } from 'vue'
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
    <div class="flex w-full min-h-[100vh] shrink grow flex-col overflow-hidden">
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

      <div class="h-full flex w-full p-4 bg-theme-bg-page gap-4">
        <AppAside
          class="min-h-0! py-4 rounded-xl"
          v-model:expand="expandMenu"
          :show-app-name="false"
          :routes
          :current-route
        />

        <main class="w-full shrink grow bg-theme-bg-page" :key="mainKey">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
