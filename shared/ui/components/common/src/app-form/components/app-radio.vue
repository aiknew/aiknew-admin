<script setup lang="ts">
import { ElRadio, ElRadioGroup } from 'element-plus';

interface Props {
  options: { label: string, value: string }[]
}

const { options } = defineProps<Props>()
</script>

<template>
  <el-radio-group v-bind="$attrs">
    <template v-for="item in options" :key="item.value">
      <el-radio :value="item.value">{{ item.label }}</el-radio>
    </template>
  </el-radio-group>
</template>
