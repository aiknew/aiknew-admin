import { I18nContext } from "nestjs-i18n"

export const TRANSLATE_PREFIX = "T:"

export const t = (str: string) => {
  return TRANSLATE_PREFIX + str
}

export const getTranslation = (text?: unknown): string => {
  if (
    typeof text === "string" &&
    text.trim() &&
    text.startsWith(TRANSLATE_PREFIX)
  ) {
    return (
      I18nContext.current()?.t(text.slice(TRANSLATE_PREFIX.length), {
        lang: I18nContext.current()?.lang,
      }) ?? ""
    )
  }

  if (Array.isArray(text)) {
    return text.map((item) => getTranslation(item)).join(".")
  }

  return (text as string) ?? ""
}
