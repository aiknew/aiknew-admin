import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LanguageData } from '@/api/language'

export const useLangStore = defineStore('lang', () => {
  const enabledLangs = ref<LanguageData[]>([])

  const getNameByKey = (key: string | undefined) => {
    if (!key) return undefined

    return enabledLangs.value.find((lang) => lang.key === key)?.name
  }

  return {
    enabledLangs,
    getNameByKey
  }
})
