<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import AppTable from '@/components/common/app-table.vue'
import { computed, ref } from 'vue'
import { useLangStore } from '@/stores/lang'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { useAdminRoleI18n } from './composables/use-admin-role-i18n'
import AdminRoleModal from './components/admin-role-modal.vue'
import { useAdminRoleDelete, useAdminRoleList, type AdminRole } from '@/api/admin-role'

const modalRef = useTemplateRef('modalRef')
const { t } = useAdminRoleI18n()
const langStore = useLangStore()
const { getTranslationField } = langStore
const { currentPage, pageSize } = usePagination()
const {
  data: adminRoleData,
  refetch: refetchAdminRoleData,
  isFetching: isFetchingAdminRoleData
} = useAdminRoleList(toReactive({ currentPage, pageSize }))
const { mutateAsync: deleteAdminRole, isPending: isDeleting } = useAdminRoleDelete()

const isLoading = computed(() => {
  return isDeleting.value || isFetchingAdminRoleData.value
})

const handleAdd = () => {
  modalRef.value?.add()
}

const handleEdit = (row: AdminRole) => {
  modalRef.value?.edit(row)
}

const refresh = () => {
  refetchAdminRoleData()
}

const handleDelete = async (row: AdminRole) => {
  await deleteAdminRole(row.id)
  refresh()
}

const handleSubmit = () => {
  refresh()
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
      :table-data="adminRoleData"
      row-key="id"
    >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" :label="t('name')" min-width="120">
        <template #default="{ row }: { row: AdminRole }">
          <span>{{ getTranslationField(row.translations, 'roleName').value }}</span>
        </template>
      </el-table-column>
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

  <AdminRoleModal ref="modalRef" @submit="handleSubmit" />
</template>
