<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed } from 'vue'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import StorageSettingModal from './components/storage-setting-modal.vue'
import { useTemplateRef } from 'vue'
import { useFileStorageDelete, useFileStorageList, type FileStorage } from '@/api/file-storage'
import { FileStorageStatus } from '@aiknew/shared-enums'
import type { ComponentProps } from 'vue-component-type-helpers'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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

const StatusType = ({ status }: { status: FileStorageStatus }) => {
  let text: string = status
  let tagType: ComponentProps<typeof ElTag>['type'] = 'primary'

  switch (status) {
    case 'NORMAL':
      text = t('storageSetting.normalStatus')
      tagType = 'primary'
      break
    case 'DISABLED':
      text = t('storageSetting.disabledStatus')
      tagType = 'danger'
      break
    case 'DISABLED_UPLOAD':
      text = t('storageSetting.disabledUploadStatus')
      tagType = 'warning'
      break
  }

  return h(ElTag, { type: tagType }, () => text)
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
      <el-table-column prop="priority" :label="t('storageSetting.priority')" />
      <el-table-column prop="type" :label="t('type')" width="180" />
      <el-table-column prop="status" :label="t('status')" width="180">
        <template #default="{ row }">
          <StatusType :status="row.status" />
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="t('createdAt')" width="220" />
      <el-table-column prop="updatedAt" :label="t('updatedAt')" width="220" />
      <el-table-column :label="t('operations')" width="150" fixed="right">
        <template #default="scope">
          <el-button
            v-permission:edit
            type="primary"
            size="small"
            icon="Edit"
            @click="handleEdit(scope.row)"
          />

          <el-popconfirm :title="t('deleteConfirm')" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button v-permission:delete type="danger" icon="Delete" size="small" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </AppTable>
  </AppContentBlock>

  <StorageSettingModal ref="modal" @submit="refetchTableData" />
</template>
