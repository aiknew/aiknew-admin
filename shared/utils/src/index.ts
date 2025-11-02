import { get } from "lodash-es"
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

  const idMap = new Map<string | number, T & { children: T[] }>()
  const result = []

  for (const item of list) {
    idMap.set(get(item, idPath) as string, { ...item, children: [] })
  }

  for (const item of idMap.values()) {
    const parent = idMap.get(get(item, parentKeyPath) as string)
    if (parent) {
      parent.children.push(item)
    } else {
      result.push(item)
    }
  }

  return result
}

export function convertNullToUndefined<T>(
  obj: T,
): Prettify<DeepNullToUndefined<T>> {
  const result = {} as Record<string, unknown>
  for (const key in obj) {
    const value = obj[key]
    result[key] =
      value === null
        ? undefined
        : typeof value === "object"
          ? convertNullToUndefined(value)
          : value
  }
  return result as never
}

export const execute = async (
  ...fnArr: ((...args: unknown[]) => unknown)[]
) => {
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

export type MaybeArray<T> = T | T[]

export type DeepPartial<T> = Prettify<{
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}>
