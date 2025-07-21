import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LanguageData } from '@/api/language'
import { z } from 'zod'

export const useLangStore = defineStore('lang', () => {
  const enabledLangs = ref<LanguageData[]>([])

  const getNameByKey = (key: string | undefined) => {
    if (!key) return undefined

    return enabledLangs.value.find((lang) => lang.key === key)?.name
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
    enabledLangs,
    getNameByKey,
    buildTranslationSchema
  }
})
