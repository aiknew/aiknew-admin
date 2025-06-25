<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import AppTable from '@/components/common/app-table.vue'
import { computed, ref } from 'vue'
import {
  useAdminApiChildren,
  useAdminApiDelete,
  useAdminApiList,
  type AdminApi
} from '@/api/admin-api'
import { useLangStore } from '@/stores/lang'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useAdminApiI18n } from './composables/use-admin-api-i18n'
import AdminApiModal from './components/admin-api-modal.vue'
import { useTemplateRef } from 'vue'

const { t } = useAdminApiI18n()
const langStore = useLangStore()
const { getTranslationField } = langStore
const { currentPage, pageSize } = usePagination()

const {
  data: adminApiData,
  refetch: refetchAdminApiData,
  isFetching: isFetchingAdminApiData
} = useAdminApiList(toReactive({ currentPage, pageSize }))
const expandParentId = ref('0')
const { refetch: fetchApiChildren } = useAdminApiChildren(expandParentId)

const loadChildren = (row: AdminApi, treeNode: unknown, resolve: (data: AdminApi[]) => void) => {
  expandParentId.value = row.id
  fetchApiChildren()
    .then(({ data }) => {
      const arr = data ?? []
      const res = arr.map((item) => ({ ...item, hasChildren: true }))
      resolve(res)
    })
    .catch(() => {
      resolve([])
    })
}

const { mutateAsync: deleteAdminApi, isPending: isDeleting } = useAdminApiDelete()
const isLoading = computed(() => {
  return isDeleting.value || isFetchingAdminApiData.value
})

const adminApiModalRef = useTemplateRef('adminApiModalRef')
const handleAdd = () => {
  adminApiModalRef.value?.add()
}

const handleEdit = (row: AdminApi) => {
  adminApiModalRef.value?.edit(row)
}

const refresh = (updatedParentIds: string[]) => {
  // TODO: 只有在updatedId处于展开状态时才更新
  refetchAdminApiData().then(({ isSuccess }) => {
    if (isSuccess) {
      updatedParentIds.forEach((id) => {
        expandParentId.value = id
        fetchApiChildren().then(({ data }) => {
          if (data) {
            appTableRef.value?.updateKeyChildren(
              id,
              data.map((item) => {
                return {
                  ...item,
                  hasChildren: true
                }
              })
            )
          }
        })
      })
    }
  })
}

const handleDelete = async (row: AdminApi) => {
  await deleteAdminApi(row.id)
  refresh([row.parentId])
}

const appTableRef = useTemplateRef('appTableRef')
const handleSubmit = ({ updatedParentIds }: { updatedParentIds: string[] }) => {
  refresh(updatedParentIds)
}
</script>

<template>
  <AppContentBlock class="mb-6"> </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">{{ t('add') }}</el-button>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :table-data="adminApiData"
      row-key="id"
      tree
      lazy
      :load="loadChildren"
    >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" :label="t('name')" width="180">
        <template #default="{ row }: { row: AdminApi }">
          <span>{{ getTranslationField(row.translations, 'apiName').value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="method" :label="t('requestMethod')" width="120">
        <template #default="{ row }">
          <el-tag>
            {{ row.method }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="URL" width="180" />
      <el-table-column prop="order" :label="t('order')" width="100" />
      <el-table-column prop="createdAt" :label="t('createdAt')" width="220" />
      <el-table-column prop="updatedAt" :label="t('updatedAt')" width="220" />
      <el-table-column :label="t('operations')" width="150">
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

  <AdminApiModal ref="adminApiModalRef" @submit="handleSubmit" />
</template>
