export type PropertyTypes<T> = {
  [key in keyof T]: T[key]
}[keyof T]

export type ArrayAble<T> = T | T[]
