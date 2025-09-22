<script lang="ts" setup generic="P extends boolean = true">
import { ElTable } from 'element-plus'
import { useTemplateRef } from 'vue'
import AppPagination from '../app-pagination.vue'
import { computed } from 'vue'
import type { IPaginationData } from '@aiknew/shared-types'

export type TableData<P extends boolean> = P extends true
  ? IPaginationData<Record<string, unknown>[]>
  : Record<string, unknown>[]

export interface Props<P extends boolean> {
  pagination?: P
  tableData?: TableData<P>
  tree?: boolean
}

const {
  pagination = true,
  tableData = { current: 1, list: [], pageSize: 10, total: 0 },
  tree = false,
} = defineProps<Props<P>>()

const elTableRef = useTemplateRef<InstanceType<typeof ElTable>>('elTable')
const currentPage = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })
const list = computed(() => {
  if (!pagination && Array.isArray(tableData)) {
    return tableData
  } else {
    if ('list' in tableData) {
      if (tree) {
        return tableData.list.map((item) => ({ ...item, hasChildren: true }))
      }

      return tableData.list
    }
  }
})

const total = computed(() => {
  if (pagination && 'total' in tableData) {
    return tableData.total
  }

  return 0
})

const clearSelection = () => {
  elTableRef.value?.clearSelection()
}

const toggleRowExpansion = (row: any, expanded?: boolean) => {
  elTableRef.value?.toggleRowExpansion(row, expanded)
}

const updateKeyChildren = <T>(key: string, data: T[]) => {
  elTableRef.value?.updateKeyChildren(key, data)
}

const doLayout = () => {
  elTableRef.value?.doLayout()
}

const getSelectionRows = () => {
  elTableRef.value?.getSelectionRows()
}

const toggleRowSelection = (
  row: unknown,
  selected?: boolean,
  ignoreSelectable = true,
) => {
  elTableRef.value?.toggleRowSelection(row, selected, ignoreSelectable)
}

defineExpose({
  clearSelection,
  toggleRowExpansion,
  updateKeyChildren,
  doLayout,
  getSelectionRows,
  toggleRowSelection,
})
</script>

<template>
  <!-- custom table header -->
  <div class="table-header">
    <slot name="header"> </slot>
  </div>

  <!-- table -->
  <el-table
    class="app-table"
    ref="elTable"
    :data="list"
    v-bind="$attrs"
    size="large"
  >
    <slot name="default"></slot>
  </el-table>

  <!-- pagination -->
  <AppPagination
    v-if="pagination"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total
  />
</template>

<style>
.table-header {
  margin-bottom: 10px;
}

.app-table.el-table {
  --el-table-header-text-color: #333;
  width: 100%;
  border: solid 1px var(--el-table-border-color);
  border-radius: 8px;
}

.app-table .el-table__inner-wrapper::before {
  background-color: transparent;
}

.app-table .el-table tr:last-child > td {
  border-bottom: none;
}
</style>
