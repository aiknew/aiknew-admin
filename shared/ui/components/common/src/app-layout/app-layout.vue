<script lang="ts" setup>
import AppLogo from '../app-logo.vue'
import AppAside from '../app-aside.vue'
import AppHeader from '../app-header.vue'
import { computed, nextTick, type Ref, ref } from 'vue'
import {
  type RouteLocationNormalizedLoadedGeneric,
  type RouteRecordRaw,
} from 'vue-router'
import { BProgress } from '@bprogress/core'
import { Layouts } from '@aiknew/shared-ui-constants'

interface Props {
  routes: RouteRecordRaw[]
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
  layout: keyof typeof Layouts
}

const { currentRoute, routes, layout } = defineProps<Props>()

const expandMenu = ref(true)
const mainKey = ref(0)

const verticalLayout = computed(() => {
  return layout === Layouts.vertical
})

const horizontalLayout = computed(() => {
  return layout === Layouts.horizontal
})

const handleRefresh = async () => {
  BProgress.start()
  mainKey.value++

  await nextTick()

  BProgress.done()
}
</script>

<template>
  <div class="flex w-full min-h-[100vh] overflow-hidden">
    <!-- Vertical layout - aside -->
    <div v-if="verticalLayout">
      <AppAside v-model:expand="expandMenu" :routes :current-route>
        <template #title="{ expand }">
          <AppLogo :expand title="Aiknew Admin" />
        </template>
      </AppAside>
    </div>

    <div class="flex flex-col grow min-w-0">
      <!-- header -->
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

      <!-- main -->
      <div class="flex grow p-4 bg-theme-bg-page gap-4">
        <!-- Horizontal-layout aside -->
        <div class="flex" v-if="horizontalLayout">
          <AppAside
            class="py-4 rounded-xl min-h-0! grow"
            v-model:expand="expandMenu"
            :routes
            :current-route
          />
        </div>

        <main
          class="w-full shrink grow bg-theme-bg-page min-w-0"
          :key="mainKey"
        >
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
