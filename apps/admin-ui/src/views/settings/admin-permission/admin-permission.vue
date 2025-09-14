<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed, ref } from 'vue'
import { usePermissionAll, usePermissionDelete, type Permission } from '@/api/permission'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import PermissionModal from './components/permission-modal.vue'
import { useTemplateRef } from 'vue'
import { tField } from '@aiknew/shared-ui-locales'
import {
  usePermissionGroupDelete,
  usePermissionGroupList,
  type PermissionGroup
} from '@/api/permission-group'
import PermissionGroupModal from './components/permission-group-modal.vue'
import type { RequestMethod } from '@aiknew/shared-enums'
import { useI18n } from 'vue-i18n'

const isPermission = (item: Permission | PermissionGroup): item is Permission => {
  return 'key' in item && typeof item.key === 'string'
}

const permissionModalRef = useTemplateRef('permissionModalRef')
const permissionGroupModalRef = useTemplateRef('permissionGroupModalRef')
const { t } = useI18n()
const { currentPage, pageSize } = usePagination()
const groupId = ref('')
const expandRowKeys = ref([])

const {
  data: groupsData,
  refetch: refetchGroups,
  isFetching
} = usePermissionGroupList(toReactive({ currentPage, pageSize }))

const { data: permissions, refetch: fetchPermissions } = usePermissionAll(groupId)

const { mutateAsync: deletePermission, isPending: isDeleting } = usePermissionDelete()
const { mutateAsync: deletePermissionGroup, isPending: isDeletingGroup } =
  usePermissionGroupDelete()

const isLoading = computed(() => {
  return isDeleting.value || isFetching.value || isDeletingGroup.value
})

const handleAddPermission = () => {
  permissionModalRef.value?.add()
}

const handleEdit = (row: Permission | PermissionGroup) => {
  if (isPermission(row)) {
    permissionModalRef.value?.edit(row)
  } else {
    permissionGroupModalRef.value?.edit(row)
  }
}

const handleAddPermissionGroup = () => {
  permissionGroupModalRef.value?.add()
}

const refresh = () => {
  expandRowKeys.value = []
  refetchGroups()
}

const handleDelete = async (row: Permission | PermissionGroup) => {
  if (isPermission(row)) {
    await deletePermission(row.id)
  } else {
    await deletePermissionGroup(row.id)
  }

  refresh()
}

const loadPermissions = async (
  row: Permission | PermissionGroup,
  _: unknown,
  resolve: (data: Permission[]) => void
) => {
  if (isPermission(row)) {
    resolve([])
  } else {
    groupId.value = row.id
    await fetchPermissions()
    resolve(permissions.value ?? [])
  }
}

const getPermissionTagType = (method: RequestMethod | null) => {
  switch (method) {
    case 'GET':
      return 'info'
    case 'POST':
      return 'primary'
    case 'PATCH':
      return 'warning'
    case 'DELETE':
      return 'danger'
    default:
      return 'success'
  }
}

const handleSubmit = () => {
  refresh()
}
</script>

<template>
  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAddPermission">{{
        t('adminPermission.addPermission')
      }}</el-button>

      <el-button @click="handleAddPermissionGroup">{{
        t('adminPermission.addPermissionGroup')
      }}</el-button>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :expand-row-keys
      :table-data="groupsData"
      row-key="id"
      tree
      lazy
      :load="loadPermissions"
    >
      <el-table-column prop="id" label="ID" width="150" show-overflow-tooltip />

      <el-table-column :label="t('type')">
        <template #default="{ row }: { row: Permission | PermissionGroup }">
          <el-tag type="primary" v-if="isPermission(row)">{{
            t('adminPermission.permission')
          }}</el-tag>
          <el-tag type="info" v-else>{{ t('adminPermission.permissionGroup') }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="name" :label="t('name')" width="180">
        <template #default="{ row }: { row: Permission | PermissionGroup }">
          <span v-if="isPermission(row)">{{
            tField(row.translations, 'permissionName').value
          }}</span>

          <span v-else>{{ tField(row.translations, 'groupName').value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="method" :label="t('adminPermission.requestMethod')" width="120">
        <template #default="{ row }">
          <el-tag v-if="isPermission(row)" :type="getPermissionTagType(row.method)">
            {{ row.method }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" :label="t('adminPermission.path')" width="180" />
      <el-table-column prop="source" :label="t('adminPermission.source')" width="180">
        <template #default="{ row }: { row: Permission | PermissionGroup }">
          <div v-if="isPermission(row)">
            <el-tag v-if="row.source === 'BUILT_IN'" type="primary">{{
              t('adminPermission.builtInPermission')
            }}</el-tag>
            <el-tag v-else type="success">{{ t('adminPermission.externalPermission') }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="order" :label="t('order')" width="100" />
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

  <PermissionModal ref="permissionModalRef" @submit="handleSubmit" />
  <PermissionGroupModal ref="permissionGroupModalRef" @submit="handleSubmit" />
</template>
