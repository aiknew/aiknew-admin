<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import type { Language } from 'element-plus/es/locales.mjs'
import { useLangStore } from './stores/lang'
import { computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { useEnabledLangList } from './api/language'
import { watch } from 'vue'
import { currentLang } from '@aiknew/shared-ui-locales'

const langStore = useLangStore()

const locales: Record<string, Language> = {
  'zh-CN': zhCn,
  en: en
}

const locale = computed(() => {
  return locales[currentLang.value]
})

const { data } = useEnabledLangList()
watch(data, () => {
  if (data.value) {
    langStore.enabledLangs = data.value
  }
})
</script>

<template>
  <el-config-provider :locale>
    <RouterView />
    <VueQueryDevtools />
  </el-config-provider>
</template>

<style scoped></style>
