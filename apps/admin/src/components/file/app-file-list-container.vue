<script setup lang="ts">
import { ref } from 'vue'
import AppPagination from '@/components/common/app-pagination.vue'
import AppFileListTable from './app-file-list-table.vue'
import { isFileItem, type FileItem, type GroupItem, type GroupPathItem } from './composables'

export interface FileListContainerProps {
  filesAndGroups: (FileItem | GroupItem)[]
  currentGroupPath: GroupPathItem[]
}

export interface FileListContainerEmits {
  (e: 'edit-group', item: GroupItem): void
  (e: 'click-group', item: GroupItem): void
  (e: 'edit-file', item: FileItem): void
  (e: 'click-file', item: FileItem): void
  (e: 'delete-group', item: GroupItem): void
  (e: 'delete-file', item: FileItem): void
  (e: 'select', items: FileItem[]): void
  (e: 'back-to-upper-group'): void
  (e: 'back-to-previous-group'): void
  (e: 'forward-to-next-group'): void
}

const currentPage = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })
const total = defineModel<number>('total', { default: 0 })
const emit = defineEmits<FileListContainerEmits>()
defineProps<FileListContainerProps>()

const appFileListTableRef = ref<InstanceType<typeof AppFileListTable>>()

const editItem = (item: FileItem | GroupItem) => {
  if (isFileItem(item)) {
    emit('edit-file', item)
  } else {
    emit('edit-group', item)
  }
}

const deleteItem = (item: FileItem | GroupItem) => {
  if (isFileItem(item)) {
    emit('delete-file', item)
  } else {
    emit('delete-group', item)
  }
}

const clickItem = (item: FileItem | GroupItem) => {
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
  clearSelection
})
</script>

<template>
  <div class="file-list">
    <AppFileListTable
      ref="appFileListTableRef"
      row-key="id"
      height="60vh"
      :data="filesAndGroups"
      :current-group-path
      @select="$emit('select', $event)"
      @delete-item="deleteItem"
      @edit-item="editItem"
      @click-item="clickItem"
      @back-to-previous-group="$emit('back-to-previous-group')"
      @back-to-upper-group="$emit('back-to-upper-group')"
      @forward-to-next-group="$emit('forward-to-next-group')"
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
