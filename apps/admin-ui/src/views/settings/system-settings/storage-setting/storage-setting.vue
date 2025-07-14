<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed, ref } from 'vue'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useStorageSettingI18n } from './composables/use-storage-setting-i18n'
import StorageSettingModal from './components/storage-setting-modal.vue'
import { useTemplateRef } from 'vue'
import { useFileStorageDelete, useFileStorageList, type FileStorage } from '@/api/file-storage'

const { t } = useStorageSettingI18n()
const { currentPage, pageSize } = usePagination()
const modalRef = useTemplateRef('modal')
const {
  data: tableData,
  refetch: refetchTableData,
  isFetching: isFetchingData
} = useFileStorageList(toReactive({ currentPage, pageSize }))
const { mutateAsync: deleteFileStorage, isPending: isDeleting } = useFileStorageDelete()

const isLoading = computed(() => {
  return isDeleting.value || isFetchingData.value
})

const handleAdd = () => {
  modalRef.value?.add()
}

const handleEdit = (row: FileStorage) => {
  modalRef.value?.edit(row)
}

const handleDelete = async (row: FileStorage) => {
  await deleteFileStorage(row.id)
  refetchTableData()
}
</script>

<template>
  <AppContentBlock class="mb-6"> </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">{{ t('add') }}</el-button>
    </div>

    <AppTable
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :table-data
      row-key="id"
    >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" :label="t('name')" width="180" />
      <el-table-column prop="type" :label="t('type')" width="180" />
      <el-table-column prop="createdAt" :label="t('createdAt')" width="220" />
      <el-table-column prop="updatedAt" :label="t('updatedAt')" width="220" />
      <el-table-column :label="t('operations')" width="150">
        <template #default="scope">
          <el-button type="primary" size="small" icon="Edit" @click="handleEdit(scope.row)" />

          <el-popconfirm :title="t('deleteConfirm')" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button type="danger" icon="Delete" size="small" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </AppTable>
  </AppContentBlock>

  <StorageSettingModal ref="modal" @submit="refetchTableData" />
</template>
