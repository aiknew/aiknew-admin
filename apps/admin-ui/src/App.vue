<script setup lang="ts">
import { RouterView } from "vue-router"
import { VueQueryDevtools } from "@tanstack/vue-query-devtools"
import { useLangStore } from "./stores/lang"
import { ElConfigProvider } from "element-plus"
import { useEnabledLangList } from "./api/language"
import { watch } from "vue"
import { ProgressProvider } from "@bprogress/vue"
import { elementLocale } from "@aiknew/shared-ui-locales"

const langStore = useLangStore()

const { data } = useEnabledLangList()
watch(data, () => {
  if (data.value) {
    langStore.enabledLangs = data.value
  }
})
</script>

<template>
  <ProgressProvider>
    <ElConfigProvider :locale="elementLocale">
      <RouterView />
      <VueQueryDevtools />
    </ElConfigProvider>
  </ProgressProvider>
</template>
