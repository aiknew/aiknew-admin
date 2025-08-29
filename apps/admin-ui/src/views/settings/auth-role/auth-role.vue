<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed } from 'vue'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { useAuthRoleI18n } from './composables/use-auth-role-i18n'
import AuthRoleModal from './components/auth-role-modal.vue'
import { useAuthRoleDelete, useAuthRoleList, type AuthRole } from '@/api/auth-role'
import { tField } from '@aiknew/shared-ui-locales'

const modalRef = useTemplateRef('modalRef')
const { t } = useAuthRoleI18n()
const { currentPage, pageSize } = usePagination()
const {
  data: authRoleData,
  refetch: refetchAuthRoleData,
  isFetching: isFetchingAuthRoleData
} = useAuthRoleList(toReactive({ currentPage, pageSize }))
const { mutateAsync: deleteAuthRole, isPending: isDeleting } = useAuthRoleDelete()

const isLoading = computed(() => {
  return isDeleting.value || isFetchingAuthRoleData.value
})

const handleAdd = () => {
  modalRef.value?.add()
}

const handleEdit = (row: AuthRole) => {
  modalRef.value?.edit(row)
}

const refresh = () => {
  refetchAuthRoleData()
}

const handleDelete = async (row: AuthRole) => {
  await deleteAuthRole(row.id)
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
      :table-data="authRoleData"
      row-key="id"
    >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" :label="t('name')" min-width="120">
        <template #default="{ row }: { row: AuthRole }">
          <span>{{ tField(row.translations, 'roleName').value }}</span>
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

  <AuthRoleModal ref="modalRef" @submit="handleSubmit" />
</template>
