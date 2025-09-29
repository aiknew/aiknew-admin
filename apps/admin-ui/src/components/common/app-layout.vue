<script setup lang="ts">
import { AppHorizontalLayout } from '@aiknew/shared-ui-layouts'
import { AppLanguageSwitcher, AppRouteTab, AppDarkModeSwitcher } from '@aiknew/shared-ui-components'
import AppUserSetting from './app-user-setting.vue'
import { onBeforeRouteUpdate, useRoute, useRouter, type LocationQueryRaw } from 'vue-router'
import { setCurrentLang, currentLang, languages } from '@aiknew/shared-ui-locales'
import { useRouteHistoryStore } from '@/stores/route-history'
import AppAdminSetting from './app-admin-setting.vue'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const currentRoutePath = ref(route.fullPath)
const routeHistoryStore = useRouteHistoryStore()

const routes = router.getRoutes().find((route) => route.name === 'Index')?.children ?? []

onBeforeRouteUpdate((to) => {
  currentRoutePath.value = to.fullPath
})

const handleRouteTabClick = (data: { path: string; query: LocationQueryRaw | undefined }) => {
  router.push(data)
}
</script>

<template>
  <component :is="AppHorizontalLayout" :routes :current-route="router.currentRoute">
    <template #operations>
      <div class="flex items-center gap-1">
        <AppDarkModeSwitcher />

        <AppLanguageSwitcher
          :languages
          :current-language="currentLang"
          @switch-lang="setCurrentLang"
        />

        <AppAdminSetting />

        <AppUserSetting />
      </div>
    </template>

    <template #top>
      <AppRouteTab
        v-model="currentRoutePath"
        :history="routeHistoryStore.routeHistory"
        @click="handleRouteTabClick"
        @remove="routeHistoryStore.removeHistory"
      />
    </template>
  </component>
</template>
