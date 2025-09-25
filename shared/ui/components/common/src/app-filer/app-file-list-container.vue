<script setup lang="ts">
import { useTemplateRef } from 'vue'
import AppPagination from '../app-pagination.vue'
import AppFileListTable from './app-file-list-table.vue'
import { isFileItem, type GroupPathItem } from './composables'
import type { IUploadFile, IUploadFileGroup } from '@aiknew/shared-types'
import { ListPermissions } from './types'

export interface Props extends ListPermissions {
  filesAndGroups: (IUploadFile | IUploadFileGroup)[]
  currentGroupPath: GroupPathItem[]
  selectLimit?: number
}

export interface Emits {
  (e: 'edit-group', item: IUploadFileGroup): void
  (e: 'click-group', item: IUploadFileGroup): void
  (e: 'edit-file', item: IUploadFile): void
  (e: 'click-file', item: IUploadFile): void
  (e: 'delete-group', item: IUploadFileGroup): void
  (e: 'delete-file', item: IUploadFile): void
  (e: 'select', items: IUploadFile[]): void
  (e: 'back-to-upper-group'): void
  (e: 'back-to-previous-group'): void
  (e: 'forward-to-next-group'): void
  (e: 'refresh'): void
}

const currentPage = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })
const total = defineModel<number>('total', { default: 0 })
const emit = defineEmits<Emits>()
const {
  selectLimit,

  /**
   * permissions
   */
  showDeleteFile = true,
  showDeleteGroup = true,
  showEditFile = true,
  showEditGroup = true,
} = defineProps<Props>()

const appFileListTableRef = useTemplateRef('appFileListTable')

const editItem = (item: IUploadFile | IUploadFileGroup) => {
  if (isFileItem(item)) {
    emit('edit-file', item)
  } else {
    emit('edit-group', item)
  }
}

const deleteItem = (item: IUploadFile | IUploadFileGroup) => {
  if (isFileItem(item)) {
    emit('delete-file', item)
  } else {
    emit('delete-group', item)
  }
}

const clickItem = (item: IUploadFile | IUploadFileGroup) => {
  if (isFileItem(item)) {
    emit('click-file', item)
  } else {
    emit('click-group', item)
  }
}

const clearSelection = () => {
  appFileListTableRef.value?.clearSelection()
}

defineExpose({
  clearSelection,
})
</script>

<template>
  <div class="file-list">
    <AppFileListTable
      ref="appFileListTable"
      row-key="id"
      height="60vh"
      :select-limit
      :data="filesAndGroups"
      :current-group-path
      :show-delete-file
      :show-delete-group
      :show-edit-file
      :show-edit-group
      @select="$emit('select', $event)"
      @delete-item="deleteItem"
      @edit-item="editItem"
      @click-item="clickItem"
      @back-to-previous-group="$emit('back-to-previous-group')"
      @back-to-upper-group="$emit('back-to-upper-group')"
      @forward-to-next-group="$emit('forward-to-next-group')"
      @refresh="$emit('refresh')"
    />
    <AppPagination
      class="file-pagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total
    />
  </div>
</template>

<style scoped lang="scss">
.file-list {
  width: 100%;

  .file-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: right;
  }
}
</style>
