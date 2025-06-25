import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { i18n, type I18nKeys } from '@/locales'
import type { LanguageData } from '@/api/language'
import { z, ZodObject, ZodString, type AnyZodObject, type ZodTypeAny } from 'zod'

export const useLangStore = defineStore('lang', () => {
  const languages = {
    'zh-CN': '简体中文',
    'zh-TW': '繁体中文',
    en: 'English'
  }
  const currentLang = useStorage<I18nKeys>('currentLang', 'zh-CN')
  const enabledLangs = ref<LanguageData[]>([])

  watch(
    currentLang,
    (val) => {
      i18n.global.locale.value = val
    },
    { immediate: true }
  )

  const switchLang = (langKey: I18nKeys) => {
    currentLang.value = langKey
  }

  const getNameByKey = (key: string | undefined) => {
    if (!key) return undefined

    return enabledLangs.value.find((lang) => lang.key === key)?.name
  }

  const getTranslationField = <T extends { langKey: string }>(
    translations: T[],
    field: keyof T
  ) => {
    return computed(() => {
      for (let i = 0; i < translations.length; i++) {
        if (translations[i].langKey === currentLang.value) {
          return translations[i][field]
        }
      }

      return ''
    })
  }

  const buildTranslationSchema = <T extends z.ZodTypeAny>(
    defaultSchema: T,
    defaultVal?: z.infer<T>
  ) => {
    const defaultVals: Record<string, z.infer<T>> = {}
    const o: Record<string, z.ZodTypeAny> = {}
    for (const lang of enabledLangs.value) {
      defaultVals[lang.key] = defaultVal
      o[lang.key] = defaultSchema
    }
    // const baseSchema = z.record(z.string(), defaultSchema)
    const baseSchema = z.object(o)

    if (defaultVal) {
      return baseSchema.default(defaultVals)
    }

    return baseSchema
  }

  return {
    languages,
    currentLang,
    enabledLangs,
    switchLang,
    getTranslationField,
    getNameByKey,
    buildTranslationSchema
  }
})
