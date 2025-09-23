<script lang="ts" setup>
import { ElPagination } from 'element-plus'
import { useResizeObserver, useThrottleFn } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'

const currentPage = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })
const total = defineModel<number>('total', { default: 0 })

const paginationLayout = ref('total, prev, next')
const el = useTemplateRef<HTMLDivElement>('elPagination')
useResizeObserver(
  el,
  useThrottleFn((entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect

    if (width > 0 && width <= 280) {
      paginationLayout.value = 'total, prev, next'
    } else if (width > 280 && width <= 400) {
      paginationLayout.value = 'total,jumper, prev, next'
    } else if (width > 400 && width <= 640) {
      paginationLayout.value = 'total, jumper, sizes, prev, next'
    } else if (width > 640) {
      paginationLayout.value = 'total, sizes, prev, pager, next, jumper'
    }
  }, 150),
)
</script>

<template>
  <div class="flex flex-col" ref="elPagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      class="mt-4 ml-auto"
      background
      :pager-count="5"
      :layout="paginationLayout"
      :total
    />
  </div>
</template>

<style>
.el-select__wrapper {
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset !important;
}
</style>
