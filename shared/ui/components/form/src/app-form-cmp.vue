<script setup lang="ts">
import {
  useField,
  type InputType,
  type TypedSchema,
  useFieldValue,
} from 'vee-validate'
import { computed, reactive, ref, watch, type Slots, type Ref } from 'vue'
import { type Components, components } from './app-form-utils'
import AppTranslationCmp from './app-translation-cmp.vue'
import type { ILanguage } from '@aiknew/shared-types'

type Field = {
  type?: InputType
  label: string
  name: string
  as: Components
  attrs?: Record<string, unknown>
  slots?: Slots
  checkedValue?: string | number | boolean
  translation?: boolean
}

interface Props {
  field: Field
  languages: ILanguage[]
}

const { field, languages } = defineProps<Props>()

const fieldOpts = {
  type: field.type,
  checkedValue: field.checkedValue,
  validateOnValueUpdate: true,
}

const useFormField = () => {
  if (field.translation) {
    // 创建一个响应式对象来存储所有语言的值
    const translationValues = ref<Record<string, unknown>>({})

    // 为每个语言创建独立的 field
    const fields = languages.reduce((acc, lang) => {
      const { value, setValue, errors } = useField<any>(
        `${field.name}.${lang.key}`,
        undefined,
        fieldOpts,
      )

      // 监听每个语言字段的变化
      watch(
        value,
        (newVal: unknown) => {
          translationValues.value[lang.key] = newVal
        },
        { immediate: true },
      )

      acc[lang.key] = { value, setValue, errors }
      return acc
    }, {} as Record<string, { value: Ref<any>; setValue: (val: any) => void; errors: Ref<string[]> }>)

    // 创建一个 computed 属性来处理双向绑定
    const computedValue = computed({
      get() {
        return translationValues.value
      },
      set(newVal: Record<string, unknown>) {
        Object.entries(fields).forEach(([langKey, field]) => {
          const value = newVal[langKey]
          if (value !== undefined) {
            field.setValue(value)
          }
        })
      },
    })

    return {
      value: computedValue,
      checked: undefined,
      handleChange: undefined,
    }
  } else {
    return useField<any>(field.name, undefined, fieldOpts)
  }
}
const { value, checked, handleChange } = useFormField()
</script>

<template>
  <template v-if="field.type === 'checkbox'">
    <component
      :is="components[field.as]"
      :ref="field.name"
      :name="field.name"
      :value
      :checked
      v-bind="field.attrs"
      @change="handleChange"
    >
      {{ field.label }}
    </component>
  </template>

  <template v-else-if="field.type === 'radio'">
    <component
      :is="components[field.as]"
      :ref="field.name"
      v-model="value"
      :value="field.checkedValue"
      v-bind="field.attrs"
    >
      {{ field.label }}
    </component>
  </template>

  <template v-else>
    <template v-if="field.translation">
      <AppTranslationCmp
        :languages
        :ref="field.name"
        v-model="value"
        :as="field.as"
        :name="field.name"
        v-bind="field.attrs"
      ></AppTranslationCmp>
    </template>

    <template v-else>
      <component
        :is="components[field.as]"
        :ref="field.name"
        v-model="value"
        v-bind="field.attrs"
      >
        <template
          v-for="(slotFn, slotName) in field.slots || {}"
          #[slotName]
          :key="slotName"
        >
          <template v-if="typeof slotFn === 'function'">
            <component
              :is="slot"
              v-for="(slot, index) in slotFn()"
              :key="index"
            ></component>
          </template>
        </template>
      </component>
    </template>
  </template>
</template>
