<script setup lang="ts">
import {
  type RouteLocationNormalizedLoadedGeneric,
  useRouter,
  type RouteRecordRaw,
} from "vue-router"
import AppMenuItem from "./app-menu-item.vue"
import { tField } from "@aiknew/shared-ui-locales"
import { type Ref } from "vue"
import type { RouteType } from "@aiknew/shared-types"

interface Props {
  routes: RouteRecordRaw[]
  topLevelRouteMap: Map<string, string[]>
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
}

interface Emits {
  (e: "active", path: string): void
}

const router = useRouter()
const { routes, currentRoute, topLevelRouteMap } = defineProps<Props>()
const emit = defineEmits<Emits>()
const isActive = (path: string) => {
  return (
    path === currentRoute.value.path ||
    !!topLevelRouteMap.get(path)?.includes(currentRoute.value.path)
  )
}

const handleClick = (path: string, type: RouteType | undefined) => {
  if (!type) return

  if (type === "MENU") {
    router.push(path)
  } else {
    const childRoutes = topLevelRouteMap.get(path)
    if (childRoutes && childRoutes.length > 0) {
      let firstChildRoute = childRoutes[0]
      if (firstChildRoute.indexOf("/") === -1) {
        firstChildRoute = path + "/" + firstChildRoute
      }
      router.push(firstChildRoute)
    }
  }

  emit("active", path)
}
</script>

<template>
  <div class="dark:border-theme-border border-b border-gray-100">
    <template v-for="item in routes" :key="item.path">
      <AppMenuItem
        v-if="!item.meta?.hidden"
        @click="handleClick(item.path, item.meta?.type)"
        :active="isActive(item.path)"
        :title="tField(item.meta?.translations ?? [], 'routeName').value"
      />
    </template>
  </div>
</template>
