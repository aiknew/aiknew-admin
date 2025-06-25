<script lang="ts" setup>
import { ElTable } from 'element-plus'
// import type { TreeProps } from 'element-plus/es/components/table/src/table/defaults'
import { useTemplateRef } from 'vue'
import AppPagination from './app-pagination.vue'
import { computed } from 'vue'

// export type { TreeProps }

type TableData = {
  current: number
  pageSize: number
  total: number
  list: Array<Record<string, unknown>>
}

interface Props {
  pagination?: boolean
  tableData?: TableData
  tree?: boolean
}

const {
  pagination = true,
  tableData = { current: 1, list: [], pageSize: 10, total: 0 },
  tree = false,
} = defineProps<Props>()

const elTableRef = useTemplateRef<InstanceType<typeof ElTable>>('elTableRef')
const currentPage = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })
const list = computed(() => {
  if (tree) {
    return tableData.list.map((item) => ({ ...item, hasChildren: true }))
  }

  return tableData.list
})

const clearSelection = (): void => {
  elTableRef.value?.clearSelection()
}

const toggleRowExpansion = (row: any, expanded?: boolean): void => {
  elTableRef.value?.toggleRowExpansion(row, expanded)
}

const updateKeyChildren = <T>(key: string, data: T[]): void => {
  elTableRef.value?.updateKeyChildren(key, data)
}

defineExpose({
  clearSelection,
  toggleRowExpansion,
  updateKeyChildren,
})
</script>

<template>
  <div>
    <el-table
      ref="elTableRef"
      :data="list"
      v-bind="$attrs"
      class="app-table"
      size="large"
    >
      <slot></slot>
    </el-table>

    <AppPagination
      v-if="pagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="tableData.total"
    />
  </div>
</template>

<style>
.app-table {
  --el-table-header-bg-color: rgba(245, 245, 245, 0.5);
  --el-table-header-text-color: #333;
  width: 100%;
  border: solid 1px var(--el-table-border-color);
  border-radius: 8px;
}

.el-table__inner-wrapper::before {
  background-color: transparent;
}

.el-table tr:last-child > td {
  border-bottom: none;
}
</style>
