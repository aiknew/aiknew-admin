import { type StandardSchemaV1 } from '@tanstack/vue-form'
import { z, ZodType, ZodDefault, ZodOptional, ZodNullable, ZodObject } from 'zod'
import {
  ElInput,
  ElSwitch,
  ElRadio,
  ElInputNumber,
  ElSelectV2,
  ElTreeSelect,
} from 'element-plus'
import { reactive, toValue, type MaybeRefOrGetter, type Component, type DefineComponent } from 'vue'
import type { ComponentProps, ComponentSlots } from 'vue-component-type-helpers'
import AppRadio from './components/app-radio.vue'
import { isDefined } from '@vueuse/core'
import type { ILanguage } from '@aiknew/shared-types'

type GetValueFromRecordOrKeep<T> = T extends Record<string, infer V> ? V : T

type GetFieldName<N extends string | undefined> = N extends string ? N : never

type GetSchemaType<T> = T extends (...args: any[]) => any ? ReturnType<T> : T

export type Fields = Field<string, keyof Components | Component | DefineComponent>[]

export type GetDefaultVals<
  Fields extends readonly Field<string, keyof Components | Component | DefineComponent>[],
> = {
    [Item in Fields[number]as GetFieldName<Item['name']>]: z.infer<
      GetSchemaType<Item['schema']>
    >
  }

export type GetI18nFields<
  Fields extends readonly Field<string, keyof Components | Component | DefineComponent>[],
> = {
    [Item in Fields[number]as Item['i18n'] extends true
    ? GetFieldName<Item['name']>
    : never]: z.infer<GetSchemaType<Item['schema']>>
  }

export type GetI18nFieldNames<
  Fields extends readonly Field<string, keyof Components | Component | DefineComponent>[],
> = keyof GetI18nFields<Fields>

export type GetFieldsWithTranslations<
  Fields extends readonly Field<string, keyof Components | Component | DefineComponent>[],
> = {
  [Item in Fields[number]as Item['i18n'] extends true
  ? never
  : GetFieldName<Item['name']>]: z.infer<GetSchemaType<Item['schema']>>
} & {
  translations: Prettify<
    {
      [K in GetI18nFieldNames<Fields>]: GetValueFromRecordOrKeep<GetI18nFields<Fields>[K]>
    } & { langKey: string }
  >[]
}

export type GetValidators<
  Fields extends readonly Field<string, keyof Components | Component | DefineComponent>[],
> = {
    [Item in Fields[number]as GetFieldName<Item['name']>]: ReturnType<
      Item['schema'] extends ZodDefault ? Item['schema']['unwrap'] : never
    >
  }

export type ComponentPropsAndSlots<T> = {
  props: ComponentProps<T>
  slots: ComponentSlots<T>
}

export interface Components {
  ElInput: ComponentPropsAndSlots<typeof ElInput>
  ElInputNumber: ComponentPropsAndSlots<typeof ElInputNumber>
  ElSelectV2: ComponentPropsAndSlots<typeof ElSelectV2>
  ElTreeSelect: ComponentPropsAndSlots<typeof ElTreeSelect>
  ElRadio: ComponentPropsAndSlots<typeof ElRadio> &
  ComponentPropsAndSlots<typeof AppRadio>
  ElSwitch: ComponentPropsAndSlots<typeof ElSwitch>
}

export type GetProps<C extends keyof Components> = Components[C]['props']

export type GetSlots<C extends keyof Components> = Components[C]['slots']

export const components: Record<keyof Components, Component> = {
  ElRadio: AppRadio,
  ElInput,
  ElSelectV2,
  ElTreeSelect,
  ElInputNumber,
  ElSwitch,
}

export type AsObject<T extends (Component | DefineComponent | keyof Components)> = {
  component: T
  props?: T extends keyof Components ? GetProps<T> : ComponentProps<T>
  slots?: T extends keyof Components ? GetSlots<T> : ComponentSlots<T>
}

type CommonContainer = {
  topSlot?: Component
  leftSlot?: Component
  rightSlot?: Component
  bottomSlot?: Component
}

type NormalFieldContainer = CommonContainer & { content?: never }
type ExcludeFieldContainer = CommonContainer & { content: Component }

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type FiledSchema = ZodType | ZodDefault | ZodOptional<ZodDefault> | ZodNullable<ZodDefault> | (() => ZodType | ZodDefault | ZodOptional<ZodDefault> | ZodNullable<ZodDefault>)

export type NormalField<N extends string, C extends keyof Components | Component | DefineComponent> = {
  hidden?: MaybeRefOrGetter<boolean>
  exclude?: false
  when?: MaybeRefOrGetter<boolean>
  as: C | AsObject<C>
  container?: NormalFieldContainer
  label: string
  name: N
  i18n?: boolean
  schema: FiledSchema
}

export type ExcludeField = {
  exclude: true
  when?: MaybeRefOrGetter<boolean>
  container: ExcludeFieldContainer
  label: string
  as?: never
  name?: never
  i18n?: never
  schema?: never
}

export type Field<N extends string, C extends keyof Components | Component | DefineComponent> =
  | NormalField<N, C>
  | ExcludeField

export const isNormalField = (
  field: NormalField<string, keyof Components | Component | DefineComponent> | ExcludeField,
): field is NormalField<string, keyof Components | Component | DefineComponent> => {
  return !field.exclude
}

export const normalizeSchema = (schemaOrFn: FiledSchema): ZodType | ZodDefault | ZodOptional<ZodDefault> | ZodNullable<ZodDefault> => {
  if (typeof schemaOrFn === 'function') {
    return schemaOrFn()
  }

  return schemaOrFn
}

export const generateDefaultVal = <
  T extends readonly Field<string, keyof Components | Component | DefineComponent>[],
>(
  fields: T,
): GetDefaultVals<T> => {
  const defaultValues = {} as Record<string, unknown>
  for (const item of fields) {

    if (isDefined(item.when) && !toValue(item.when)) continue

    if (isNormalField(item)) {
      const res = (normalizeSchema(item.schema)).safeParse(undefined)
      if (res.success) {
        defaultValues[item.name] = res.data
      } else {
        defaultValues[item.name] = undefined
      }
    }
  }

  return defaultValues as GetDefaultVals<T>
}

export const generateValidators = <
  T extends readonly Field<string, keyof Components | Component | DefineComponent>[],
  R = StandardSchemaV1<GetDefaultVals<T>>,
>(
  fields: T,
): R => {
  const schemas = {} as Record<keyof GetDefaultVals<T>, ZodType>
  for (const item of fields) {
    if (isDefined(item.when) && !toValue(item.when)) continue

    if (isNormalField(item)) {
      const schema = normalizeSchema(item.schema)
      if ('unwrap' in schema) {
        schemas[item.name as keyof GetDefaultVals<T>] =
          schema.unwrap() as ZodType
      } else {
        schemas[item.name as keyof GetDefaultVals<T>] =
          schema
      }

    }
  }

  return z.object(schemas) as R
}

export const defineFields = <
  const T extends readonly Field<string, keyof Components | Component | DefineComponent>[],
>(
  ...items: T
) => {
  return reactive(items)
}

export const buildI18nSchema = <T extends ZodDefault<ZodType> | ZodType>(
  schema: T,
  languages: ILanguage[],
): ZodObject<Readonly<{ [k: string]: T }>> => {
  const schemas: Record<string, T> = {}
  const defaultVals: Record<string, z.infer<T>> = {}
  languages.forEach((lang) => {
    schemas[lang.key] = schema

    if (schema instanceof ZodDefault) {
      defaultVals[lang.key] = schema.parse(undefined) as z.infer<T>
    } else {
      defaultVals[lang.key] = undefined as never
    }
  })

  return z.object(schemas).default(defaultVals) as never
}
