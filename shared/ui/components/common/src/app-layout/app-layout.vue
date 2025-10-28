<script lang="ts" setup>
import AppLogo from "../app-logo.vue"
import AppAside from "../app-aside.vue"
import AppHeader from "../app-header.vue"
import AppRecursiveMenu from "../app-recursive-menu.vue"
import AppMenu from "./components/app-menu.vue"
import { ElMenu } from "element-plus"
import { computed, nextTick, type Ref, ref } from "vue"
import {
  type RouteLocationNormalizedLoadedGeneric,
  type RouteRecordRaw,
} from "vue-router"
import { BProgress } from "@bprogress/core"
import { Layouts } from "@aiknew/shared-ui-constants"
import { useWindowSize } from "@vueuse/core"

interface Props {
  routes: RouteRecordRaw[]
  topLevelRouteMap: Map<string, string[]>
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
  layout: keyof typeof Layouts
}

const { currentRoute, routes, layout } = defineProps<Props>()
const { width } = useWindowSize()
const expandMenu = ref(true)
const mainKey = ref(0)
const activeTopLevelMenuPath = ref<string>(currentRoute.value.path)

const topLevelRoutes = computed<RouteRecordRaw[]>(() => {
  return routes.filter((item) => !item.meta?.hidden)
})

const secondLevelRoutes = computed(() => {
  return (
    routes.find((item) => item.path === activeTopLevelMenuPath.value)
      ?.children ?? []
  )
})

const verticalLayout = computed(() => {
  return layout === Layouts.vertical
})

const horizontalLayout = computed(() => {
  return layout === Layouts.horizontal
})

const mixedLayout = computed(() => {
  return layout === Layouts.mixed
})

const showExpandBtn = computed(() => {
  if (width.value < 768) {
    return true
  }

  return verticalLayout.value || mixedLayout.value
})

const showVerticalAside = computed(() => {
  return verticalLayout.value || width.value < 768
})

const handleRefresh = async () => {
  BProgress.start()
  mainKey.value++

  await nextTick()

  BProgress.done()
}

const handleActiveTopLevelMenu = (path: string) => {
  activeTopLevelMenuPath.value = path
}
</script>

<template>
  <div class="flex min-h-[100vh] w-full overflow-hidden">
    <!-- Vertical Layout Aside -->
    <div v-if="showVerticalAside">
      <AppAside v-model:expand="expandMenu" :routes :current-route>
        <template #title="{ expand }">
          <AppLogo :expand title="Aiknew Admin" />
        </template>
      </AppAside>
    </div>

    <div class="flex min-w-0 grow flex-col">
      <!-- header -->
      <AppHeader
        v-model:expand-menu="expandMenu"
        :current-route
        :show-expand-btn
        @refresh="handleRefresh"
      >
        <template #operations>
          <slot name="operations"></slot>
        </template>
      </AppHeader>

      <!-- Horizontal Layout Menu -->
      <div class="hidden md:block" v-if="horizontalLayout">
        <el-menu
          mode="horizontal"
          :default-active="currentRoute.value.path"
          :collapse="false"
          router
        >
          <AppRecursiveMenu
            min-width="unset"
            :routes="horizontalLayout ? routes : topLevelRoutes"
          />
        </el-menu>
      </div>

      <!-- Mixed Layout Menu -->
      <div v-if="mixedLayout && !showVerticalAside">
        <AppMenu
          :routes
          :top-level-route-map
          :current-route
          @active="handleActiveTopLevelMenu"
        />
      </div>

      <slot name="top"></slot>

      <!-- main -->
      <div class="bg-theme-bg-page flex grow gap-4 p-4">
        <!-- Mixed Layout Aside -->
        <div
          class="flex"
          v-if="mixedLayout && !showVerticalAside && secondLevelRoutes.length"
        >
          <AppAside
            class="min-h-0! grow rounded-xl py-4"
            v-model:expand="expandMenu"
            :routes="secondLevelRoutes"
            :current-route
          />
        </div>

        <main
          class="bg-theme-bg-page w-full min-w-0 shrink grow"
          :key="mainKey"
        >
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style>
.el-menu--horizontal {
  --el-menu-horizontal-height: 50px;
}

.el-menu--horizontal > .el-menu-item {
  border-bottom: unset !important;
}

.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
  border-bottom: unset !important;
}
</style>
