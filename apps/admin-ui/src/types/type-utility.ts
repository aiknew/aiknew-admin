import type { MaybeRef } from 'vue'
import type { ResponseJson } from './request'

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type ShallowMaybeRef<T> = {
  [K in keyof T]: MaybeRef<T[K]>
}

export type UnwrapMaybeRefOrGetter<T> = T extends () => infer R
  ? R
  : T extends { value: infer R }
    ? R
    : T

export type TreeList<T, D = T & { disabled?: boolean }> = (D & { children: D[] })[]

export const isResponseJson = (v: unknown): v is ResponseJson => {
  return typeof v === 'object' && !!v && 'code' in v && 'data' in v && 'msg' in v
}
