<script setup lang="ts">
import { ElRadio, ElRadioGroup } from "element-plus"

interface Props {
  options: { label: string; value: string }[]
}

const { options } = defineProps<Props>()
</script>

<template>
  <ElRadioGroup v-bind="$attrs">
    <template v-for="item in options" :key="item.value">
      <ElRadio :value="item.value">{{ item.label }}</ElRadio>
    </template>
  </ElRadioGroup>
</template>
