import type { MaybeRef } from 'vue'

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

export type TreeList<T, D = T & { disabled?: boolean }> = (D & {
  children: D[]
})[]
