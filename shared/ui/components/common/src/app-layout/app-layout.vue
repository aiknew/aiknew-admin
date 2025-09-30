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

const basicLayout = computed(() => {
  return layout === Layouts.basic
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
  <div
    class="flex w-full min-h-[100vh] shrink grow overflow-hidden"
    :class="{ 'flex-col': horizontalLayout }"
  >
    <div class="w-full" v-if="horizontalLayout">
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
    </div>

    <div
      :class="[
        'flex',
        { 'bg-theme-bg-page': horizontalLayout },
        { 'horizontal-wrapper': horizontalLayout },
        { grow: horizontalLayout },
      ]"
    >
      <AppAside
        :class="{ 'horizontal-aside': horizontalLayout }"
        v-model:expand="expandMenu"
        :routes
        :current-route
      >
        <template v-if="basicLayout" #title="{ expand }">
          <AppLogo :expand title="Aiknew Admin" />
        </template>
      </AppAside>

      <div
        class="flex shrink grow flex-col overflow-hidden"
        :class="{ 'min-h-[100vh]': basicLayout }"
      >
        <div v-if="basicLayout">
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
        </div>

        <main
          class="w-full shrink grow bg-theme-bg-page"
          :class="{ 'p-4': basicLayout }"
          :key="mainKey"
        >
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style>
@reference "tailwindcss";

.horizontal-wrapper {
  @apply h-full w-full p-4 gap-4;
}

.horizontal-aside {
  @apply min-h-0! py-4 rounded-xl;
}
</style>
