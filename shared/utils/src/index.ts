import { get } from 'lodash-es'

/**
 * build tree list from an array
 * @param list source list
 * @param idPath the key path of the current object's id
 * @param parentKeyPath the parent key path of the object
 * @returns
 */
export const buildTree = <T>(
  list: T[] | undefined,
  idPath: string,
  parentKeyPath: string,
): (T & { children: T[] })[] => {
  if (!list) {
    return []
  }

  const idMap = new Map()
  const result = []

  for (const item of list) {
    idMap.set(get(item, idPath), { ...item, children: [] })
  }

  for (const item of idMap.values()) {
    const parent = idMap.get(get(item, parentKeyPath))
    if (parent) {
      parent.children.push(item)
    } else {
      result.push(item)
    }
  }

  return result
}

export const execute = async (...fnArr: Function[]) => {
  for (const fn of fnArr) {
    await fn()
  }
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type NullToUndefined<T> = T extends null ? undefined : T

export type DeepNullToUndefined<T> = {
  [K in keyof T]: T[K] extends object
    ? DeepNullToUndefined<T[K]>
    : NullToUndefined<T[K]>
}

export function convertNullToUndefined<T>(
  obj: T,
): Prettify<DeepNullToUndefined<T>> {
  const result = {} as any
  for (const key in obj) {
    const value = obj[key]
    result[key] =
      value === null
        ? undefined
        : typeof value === 'object'
        ? convertNullToUndefined(value)
        : value
  }
  return result
}
