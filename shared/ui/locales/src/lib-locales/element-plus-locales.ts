import zhCN from 'element-plus/es/locale/lang/zh-cn'
import zhTW from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import type { Language } from 'element-plus/es/locales.mjs'
import { computed } from 'vue'
import { currentLang } from '../index'

const locales: Record<string, Language> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  en: en
}

export const elementLocale = computed(() => {
  return locales[currentLang.value]
})