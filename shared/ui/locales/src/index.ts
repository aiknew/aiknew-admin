import { computed, ref, type App } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './en.json'
import zhCN from './zh-CN.json'
import zhTW from './zh-TW.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    en,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
  },
})

export type I18nKeys = keyof (typeof i18n)['global']['messages']['value']

export const languages = computed(() => {
  return i18n.global.availableLocales
})

export const currentLang = computed(() => {
  return i18n.global.locale.value
})

export const setCurrentLang = (lang: I18nKeys) => {
  i18n.global.locale.value = lang
}

export const tField = <T extends { langKey: string }>(
  translations: T[],
  field: keyof T,
) => {
  return computed(() => {
    for (let i = 0; i < translations.length; i++) {
      if (translations[i].langKey === i18n.global.locale.value) {
        return translations[i][field]
      }
    }

    return ''
  })
}

export const t: typeof i18n.global.t = i18n.global.t

export const installI18n = (app: App<Element>) => {
  app.use(i18n)
}
