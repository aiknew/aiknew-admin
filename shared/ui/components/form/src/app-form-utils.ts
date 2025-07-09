import {
  ElCheckbox,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElRadio,
  ElRadioButton,
  ElSelectV2,
  ElSwitch,
  ElTreeSelect,
} from 'element-plus'
import {
  defineAsyncComponent,
  reactive,
  shallowReactive,
  type Component,
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue'
import type { ComponentProps, ComponentSlots } from 'vue-component-type-helpers'
import { z, type ZodTypeAny } from 'zod'
// import 'element-plus/es/components/radio/style/index'
// import 'element-plus/es/components/select-v2/style/index'
// import 'element-plus/es/components/segmented/style/index'
// import 'element-plus/es/components/input-number/style/index'
// import 'element-plus/es/components/input/style/index'
// import 'element-plus/es/components/tree-select/style/index'
// import 'element-plus/es/components/switch/style/index'
import type {
  ShallowMaybeRef,
  UnwrapMaybeRefOrGetter,
} from '@aiknew/shared-ui-types'
import { WangEditor } from '@aiknew/shared-ui-components'

export type ComponentPropsAndSlots<T> = ShallowMaybeRef<ComponentProps<T>> & {
  slots?: ComponentSlots<T>
}

export type SpecialOptions = { value: string; label: string }[]

export interface ComponentOptionsMap {
  ElCheckbox: {
    options: SpecialOptions
    attrs: ComponentPropsAndSlots<typeof ElCheckbox>
  }
  ElRadio: {
    options: SpecialOptions
    attrs: ComponentPropsAndSlots<typeof ElRadioButton>
  }
  ElFormItem: {
    attrs: ComponentPropsAndSlots<typeof ElFormItem>
  }
  ElInput: {
    attrs: ComponentPropsAndSlots<typeof ElInput>
  }
  ElSelectV2: {
    attrs: ComponentPropsAndSlots<typeof ElSelectV2>
  }
  ElTreeSelect: {
    attrs: ComponentPropsAndSlots<typeof ElTreeSelect>
  }
  ElInputNumber: {
    attrs: ComponentPropsAndSlots<typeof ElInputNumber>
  }
  ElSwitch: {
    attrs: ComponentPropsAndSlots<typeof ElSwitch>
  }
  WangEditor: {
    attrs: ComponentPropsAndSlots<typeof WangEditor>
  }
}

export type Components = keyof ComponentOptionsMap

export const components: Record<Components, Component> = {
  ElCheckbox,
  ElRadio,
  ElFormItem,
  ElInput,
  ElSelectV2,
  ElTreeSelect,
  ElInputNumber,
  ElSwitch,
  WangEditor,
}

export type ComponentOptionsObject<
  K extends keyof ComponentOptionsMap,
  N extends string,
> = {
  as: K
  label: string
  name: N
  translation?: boolean
  enabled?: MaybeRefOrGetter<boolean>
  options?: 'options' extends keyof ComponentOptionsMap[K]
    ? ComponentOptionsMap[K]['options']
    : never
  attrs?: ComponentOptionsMap[K]['attrs']
  rules?: MaybeRefOrGetter<ZodTypeAny>
  formItemSlots?: ComponentSlots<typeof ElFormItem>
}
// & (K extends 'ElFormItem' ? {} : { name: N })

export type Field<N extends string> = {
  [K in keyof ComponentOptionsMap]: ComponentOptionsObject<K, N>
}[keyof ComponentOptionsMap]

export const errorTabKeysInjectionKey = Symbol() as InjectionKey<
  ComputedRef<Record<string, string[] | undefined>>
>

export const fieldsTabKeysInjectionKey = Symbol() as InjectionKey<
  Ref<Record<string, string>>
>

export type FormValues<
  F extends Readonly<{ name: string; rules?: MaybeRefOrGetter<ZodTypeAny> }[]>,
> = {
  [S in F[number] as S['name']]: S['rules'] extends MaybeRefOrGetter<ZodTypeAny>
    ? z.infer<UnwrapMaybeRefOrGetter<S['rules']>>
    : undefined
}

export const makeFields = <const T extends Field<string>[]>(...items: T) => {
  return items
}
