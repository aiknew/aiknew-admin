import { createI18n } from 'vue-i18n'
import en from './en.json' with {type: 'json'}
import zhCN from './zh-CN.json' with {type: 'json'}
import zhTW from './zh-TW.json' with {type: 'json'}

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

export const t: typeof i18n.global.t = i18n.global.t
