<script setup lang="ts">
import { AppBasicLayout } from '@aiknew/shared-ui-layouts'
import { AppLanguageSwitcher } from '@aiknew/shared-ui-components'
import AppUserSetting from './app-user-setting.vue'
import { useRouter, useRoute } from 'vue-router'
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()
const router = useRouter()

const routes = router.getRoutes().find((route) => route.name === 'Index')?.children ?? []
const currentRoute = useRoute()
</script>

<template>
  <AppBasicLayout :routes :current-route="router.currentRoute">
    <template #operations>
      <AppLanguageSwitcher
        :languages="langStore.languages"
        :current-language="langStore.currentLang"
        @switch-lang="langStore.switchLang"
      />

      <AppUserSetting />
    </template>
  </AppBasicLayout>
</template>
