import { type I18nKeys } from "../index";
import * as z from "zod";
import { en, zhCN, zhTW } from "zod/locales"
import { type $ZodConfig } from "zod/v4/core";

const localesMap: Record<I18nKeys, () => Partial<$ZodConfig>> = {
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  en: en
}

export const setZodLocales = (lang: I18nKeys) => {
  lang = Object.keys(localesMap).includes(lang) ? lang : 'en'
  z.config(localesMap[lang]());
}