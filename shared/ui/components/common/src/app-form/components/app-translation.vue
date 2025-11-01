<script setup lang="ts" generic="T">
import type { ILanguage } from "@aiknew/shared-types"
import { ElTabs, ElTabPane } from "element-plus"
import { cloneDeep } from "lodash-es"
import { computed, ref, watch } from "vue"

export type ValType<T> = Record<string, undefined | unknown | T>

export interface Props<T> {
  languages: ILanguage[]
  modelValue: ValType<T>
  activeLang: string
}

export interface Emits<T> {
  (e: "update:modelValue", val: ValType<T>): void
  (e: "update:activeLang", lang: string): void
}

const { languages, activeLang, modelValue = {} } = defineProps<Props<T>>()
const emit = defineEmits<Emits<T>>()
const valObj = ref<ValType<T>>(cloneDeep(modelValue))

watch(
  () => modelValue,
  (val: ValType<T>) => {
    valObj.value = cloneDeep(val)
  },
)

const setLangVal = (val: unknown) => {
  valObj.value[activeLang] = val
  emit("update:modelValue", valObj.value)
}

const value = computed({
  get() {
    return valObj.value[activeLang]
  },

  set: setLangVal,
})
</script>

<template>
  <ElTabs
    :modelValue="activeLang"
    @update:model-value="emit('update:activeLang', $event as string)"
    class="w-full"
    type="border-card"
  >
    <ElTabPane
      v-for="lang in languages"
      :key="lang.key"
      :label="lang.name"
      :name="lang.key"
    >
    </ElTabPane>

    <div>
      <slot :value :setLangVal v-bind="$attrs"> </slot>
    </div>
  </ElTabs>
</template>
