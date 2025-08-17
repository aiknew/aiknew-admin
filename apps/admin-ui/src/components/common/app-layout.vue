<script setup lang="ts">
import { AppBasicLayout } from '@aiknew/shared-ui-layouts'
import { AppLanguageSwitcher, AppRouteTab } from '@aiknew/shared-ui-components'
import AppUserSetting from './app-user-setting.vue'
import { useRouter } from 'vue-router'
import { setCurrentLang, currentLang, languages } from '@aiknew/shared-ui-locales'
import { useRouteHistoryStore } from '@/stores/route-history'

const router = useRouter()
const routeHistoryStore = useRouteHistoryStore()

const routes = router.getRoutes().find((route) => route.name === 'Index')?.children ?? []
</script>

<template>
  <AppBasicLayout :routes :current-route="router.currentRoute">
    <template #operations>
      <AppLanguageSwitcher
        :languages
        :current-language="currentLang"
        @switch-lang="setCurrentLang"
      />

      <AppUserSetting />
    </template>

    <template #top>
      <AppRouteTab
        :history="routeHistoryStore.routeHistory"
        @remove="routeHistoryStore.removeHistory"
      />
    </template>
  </AppBasicLayout>
</template>
