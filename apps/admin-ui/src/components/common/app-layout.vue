<script setup lang="ts">
import { AppBasicLayout } from '@aiknew/shared-ui-layouts'
import { AppLanguageSwitcher } from '@aiknew/shared-ui-components'
import AppUserSetting from './app-user-setting.vue'
import { useRouter } from 'vue-router'
import { setCurrentLang, currentLang, languages } from '@aiknew/shared-ui-locales'

const router = useRouter()

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
  </AppBasicLayout>
</template>
