import type {
  TranslationObject,
  TranslationObjectArray,
} from '@aiknew/shared-api-types'

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value)
}

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export const isClass = <T = any>(
  value: unknown,
): value is new (...args: any[]) => T => {
  return typeof value === 'function' && value.prototype.constructor === value
}

export const isTranslationObject = (
  value: unknown,
): value is TranslationObject => {
  return isObject(value) && typeof value.langKey === 'string'
}

export const isTranslationObjectArray = (
  value: unknown,
): value is TranslationObjectArray => {
  if (isArray(value)) {
    return value.every((item) => isTranslationObject(item))
  }
  return false
}
