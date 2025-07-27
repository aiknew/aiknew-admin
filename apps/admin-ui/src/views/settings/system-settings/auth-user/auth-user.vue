<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed } from 'vue'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useAdminUserI18n } from './composables/use-admin-user-i18n'
import { useTemplateRef } from 'vue'
import { useAuthUserDelete, useAuthUserList, type AuthUser } from '@/api/auth-user'
import AdminUserModal from './components/admin-user-modal.vue'

const modalRef = useTemplateRef('modalRef')
const { t } = useAdminUserI18n()
const { currentPage, pageSize } = usePagination()

const {
  data: adminUserData,
  refetch: refetchAdminUserData,
  isFetching: isFetchingAdminUserData
} = useAuthUserList(toReactive({ currentPage, pageSize }))
const { mutateAsync: deleteAdminUser, isPending: isDeleting } = useAuthUserDelete()
const isLoading = computed(() => {
  return isDeleting.value || isFetchingAdminUserData.value
})

const handleAdd = () => {
  modalRef.value?.add()
}

const handleEdit = (row: AuthUser) => {
  modalRef.value?.edit(row)
}

const handleDelete = async (row: AuthUser) => {
  await deleteAdminUser(row.id)
  refetchAdminUserData()
}
</script>

<template>
  <AppContentBlock class="mb-6"> </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">{{ t('add') }}</el-button>
    </div>

    <AppTable
      ref="testTableRef"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :table-data="adminUserData"
      row-key="id"
    >
      <el-table-column type="selection" prop="id" label="ID" />
      <el-table-column prop="userName" :label="t('name')"> </el-table-column>
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

  <AdminUserModal ref="modalRef" @submit="refetchAdminUserData" />
</template>
