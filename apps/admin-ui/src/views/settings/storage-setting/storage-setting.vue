<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag, ElFormItem } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed, ref } from 'vue'
import { toReactive } from '@vueuse/core'
import StorageSettingModal from './components/storage-setting-modal.vue'
import { useTemplateRef } from 'vue'
import {
  useFileStorageDelete,
  useFileStorageList,
  type FileStorage,
  type QueryFileStorageDto
} from '@/api/file-storage'
import { FileStorageStatus, StorageType } from '@aiknew/shared-enums'
import type { ComponentProps } from 'vue-component-type-helpers'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppForm, type Fields } from '@aiknew/shared-ui-form'
import z from 'zod'

const { t } = useI18n()
const query = ref<QueryFileStorageDto>({
  currentPage: 1,
  pageSize: 10
})
const modalRef = useTemplateRef('modal')
const {
  data: tableData,
  refetch: refetchTableData,
  isFetching: isFetchingData
} = useFileStorageList(toReactive(query))
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

const translateStatusType = (status: FileStorageStatus) => {
  switch (status) {
    case 'NORMAL':
      return t('storageSetting.normalStatus')
    case 'DISABLED':
      return t('storageSetting.disabledStatus')
    case 'DISABLED_UPLOAD':
      return t('storageSetting.disabledUploadStatus')
  }
}

const StatusType = ({ status }: { status: FileStorageStatus }) => {
  let tagType: ComponentProps<typeof ElTag>['type'] = 'primary'

  switch (status) {
    case 'NORMAL':
      tagType = 'primary'
      break
    case 'DISABLED':
      tagType = 'danger'
      break
    case 'DISABLED_UPLOAD':
      tagType = 'warning'
      break
  }

  return h(ElTag, { type: tagType }, () => translateStatusType(status))
}

const { AppForm: QueryForm, formApi } = useAppForm({
  formProps: {
    inline: true
  },
  fields() {
    return [
      {
        as: {
          component: 'ElInput'
        },
        label: t('name'),
        name: 'name',
        schema: z.string().default('').optional()
      },

      {
        as: {
          component: 'ElInput'
        },
        label: t('storageSetting.hostname'),
        name: 'hostname',
        schema: z.string().default('').optional()
      },

      {
        as: {
          component: 'ElSelectV2',
          props: {
            style: { minWidth: '150px' },
            options: [
              {
                label: translateStatusType(FileStorageStatus.DISABLED),
                value: FileStorageStatus.DISABLED
              },
              {
                label: translateStatusType(FileStorageStatus.NORMAL),
                value: FileStorageStatus.NORMAL
              },
              {
                label: translateStatusType(FileStorageStatus.DISABLED_UPLOAD),
                value: FileStorageStatus.DISABLED_UPLOAD
              }
            ]
          }
        },
        label: t('status'),
        name: 'status',
        schema: z.enum(FileStorageStatus).default('NORMAL').optional()
      },

      {
        as: {
          component: 'ElSelectV2',
          props: {
            style: { minWidth: '150px' },
            options: [
              {
                label: StorageType.LOCAL,
                value: StorageType.LOCAL
              },
              {
                label: StorageType.S3,
                value: StorageType.S3
              }
            ]
          }
        },
        label: t('type'),
        name: 'type',
        schema: z.enum(StorageType).default('LOCAL').optional()
      }
    ] as const satisfies Fields
  },
  onSubmit({ values }) {
    query.value = {
      ...query.value,
      ...values
    }
  }
})

const handleResetQueryForm = () => {
  formApi.reset()
  query.value = {
    currentPage: 1,
    pageSize: 10
  }
}
</script>

<template>
  <AppContentBlock class="mb-6">
    <QueryForm>
      <el-form-item>
        <el-button type="primary" @click="formApi.handleSubmit">
          {{ t('submit') }}
        </el-button>
        <el-button @click="handleResetQueryForm">{{ t('reset') }}</el-button>
      </el-form-item>
    </QueryForm>
  </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">{{ t('add') }}</el-button>
    </div>

    <AppTable
      v-model:current-page="query.currentPage"
      v-model:page-size="query.pageSize"
      :table-data
      row-key="id"
    >
      <el-table-column prop="id" label="ID" width="150" show-overflow-tooltip />
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
