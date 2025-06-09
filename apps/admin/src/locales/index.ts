import { createI18n } from 'vue-i18n'
import en from './en.json'
import zhCN from './zh-CN.json'
import zhTW from './zh-TW.json'

export const i18n = createI18n({
  legacy: false,
  locale: window.navigator.language,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    en,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
  },
})

export type I18nKeys = keyof (typeof i18n)['global']['messages']['value']

export const t = i18n.global.t
