<script lang="ts" setup>
import { ElTabs, ElTabPane } from 'element-plus'
import 'element-plus/es/components/tabs/style/index'
import 'element-plus/es/components/tab-pane/style/index'
import { computed, inject, ref, type Ref } from 'vue'
import {
  components,
  // errorTabKeysInjectionKey,
  fieldsTabKeysInjectionKey,
  type Components,
} from './app-form-utils'
import type { ILanguage } from '@aiknew/shared-types'

type ModelVal = { [k: string]: unknown }
interface Props {
  as: Components
  name: string
  modelValue: ModelVal
  languages: ILanguage[]
}

interface Emits {
  (e: 'update:modelValue', val: ModelVal): void
}

const { modelValue, name, languages } = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleUpdateVal = (val: unknown, langKey: string) => {
  emit('update:modelValue', {
    ...modelValue,
    [langKey]: val,
  })
}

// const allFieldsErrorTabKeys = inject(
//   errorTabKeysInjectionKey,
//   computed(() => {
//     return {} as Record<string, string[]>
//   }),
// )

const allFieldsCurrentTabKey = inject(
  fieldsTabKeysInjectionKey,
  ref({}) as Ref<Record<string, string>>,
)

// const selfErrorTabKeys = computed(() => {
//   return allFieldsErrorTabKeys.value[name]
// })

const activeTab = computed({
  get() {
    return allFieldsCurrentTabKey.value[name]
  },

  set(newVal) {
    allFieldsCurrentTabKey.value[name] = newVal
  },
})
</script>

<template>
  <el-tabs v-model="activeTab" class="w-full" type="border-card">
    <el-tab-pane
      v-for="lang in languages"
      :key="lang.key"
      :label="lang.name"
      :name="lang.key"
    >
      <component
        :is="components[as]"
        v-if="modelValue && lang.key in modelValue"
        :model-value="modelValue[lang.key]"
        @update:model-value="handleUpdateVal($event, lang.key)"
      ></component>
    </el-tab-pane>
  </el-tabs>
</template>
