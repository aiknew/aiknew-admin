<script lang="ts" setup>
import { ElTable } from 'element-plus'
import { useTemplateRef } from 'vue'
import { AppPagination } from '@aiknew/shared-ui-components'
import { computed } from 'vue'
import type { IPaginationData } from '@aiknew/shared-types'

export interface Props {
  pagination?: boolean
  tableData?: IPaginationData<Record<string, unknown>[]>
  tree?: boolean
}

const {
  pagination = true,
  tableData = { current: 1, list: [], pageSize: 10, total: 0 },
  tree = false,
} = defineProps<Props>()

const elTableRef = useTemplateRef<InstanceType<typeof ElTable>>('elTable')
const currentPage = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })
const list = computed(() => {
  if (tree) {
    return tableData.list.map((item) => ({ ...item, hasChildren: true }))
  }

  return tableData.list
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

defineExpose({
  clearSelection,
  toggleRowExpansion,
  updateKeyChildren,
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
    :total="tableData.total"
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
