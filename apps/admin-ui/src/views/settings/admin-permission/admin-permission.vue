<script lang="ts" setup>
import { AppContentBlock } from "@aiknew/shared-ui-components"
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from "element-plus"
import { AppTable } from "@aiknew/shared-ui-components"
import { computed, ref } from "vue"
import {
  usePermissionAll,
  usePermissionDelete,
  type Permission,
} from "@/api/permission"
import { usePagination } from "@/composables"
import { toReactive } from "@vueuse/core"
import PermissionModal from "./components/permission-modal.vue"
import { useTemplateRef } from "vue"
import { tField } from "@aiknew/shared-ui-locales"
import {
  usePermissionGroupDelete,
  usePermissionGroupList,
  type PermissionGroup,
} from "@/api/permission-group"
import PermissionGroupModal from "./components/permission-group-modal.vue"
import type { RequestMethod } from "@aiknew/shared-enums"
import { useI18n } from "vue-i18n"

const isPermission = (
  item: Permission | PermissionGroup,
): item is Permission => {
  return "key" in item && typeof item.key === "string"
}

const permissionModalRef = useTemplateRef("permissionModalRef")
const permissionGroupModalRef = useTemplateRef("permissionGroupModalRef")
const { t } = useI18n()
const { currentPage, pageSize } = usePagination()
const groupId = ref("")
const expandRowKeys = ref([])

const {
  data: groupsData,
  refetch: refetchGroups,
  isFetching,
} = usePermissionGroupList(toReactive({ currentPage, pageSize }))

const { data: permissions, refetch: fetchPermissions } =
  usePermissionAll(groupId)

const { mutateAsync: deletePermission, isPending: isDeleting } =
  usePermissionDelete()
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
  resolve: (data: Permission[]) => void,
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
    case "GET":
      return "info"
    case "POST":
      return "primary"
    case "PATCH":
      return "warning"
    case "DELETE":
      return "danger"
    default:
      return "success"
  }
}

const handleSubmit = () => {
  refresh()
}
</script>

<template>
  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <ElButton class="ml-auto" type="primary" @click="handleAddPermission">{{
        t("adminPermission.addPermission")
      }}</ElButton>

      <ElButton @click="handleAddPermissionGroup">{{
        t("adminPermission.addPermissionGroup")
      }}</ElButton>
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
      <ElTableColumn prop="id" label="ID" width="150" show-overflow-tooltip />

      <ElTableColumn :label="t('type')" width="150">
        <template #default="{ row }: { row: Permission | PermissionGroup }">
          <ElTag type="primary" v-if="isPermission(row)">{{
            t("adminPermission.permission")
          }}</ElTag>
          <ElTag type="info" v-else>{{
            t("adminPermission.permissionGroup")
          }}</ElTag>
        </template>
      </ElTableColumn>

      <ElTableColumn prop="name" :label="t('name')" width="180">
        <template #default="{ row }: { row: Permission | PermissionGroup }">
          <span v-if="isPermission(row)">{{
            tField(row.translations, "permissionName").value
          }}</span>

          <span v-else>{{ tField(row.translations, "groupName").value }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="method"
        :label="t('adminPermission.requestMethod')"
        width="120"
      >
        <template #default="{ row }">
          <ElTag
            v-if="isPermission(row)"
            :type="getPermissionTagType(row.method)"
          >
            {{ row.method }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="path"
        :label="t('adminPermission.path')"
        width="180"
      />
      <ElTableColumn
        prop="source"
        :label="t('adminPermission.source')"
        width="180"
      >
        <template #default="{ row }: { row: Permission | PermissionGroup }">
          <div v-if="isPermission(row)">
            <ElTag v-if="row.source === 'BUILT_IN'" type="primary">{{
              t("adminPermission.builtInPermission")
            }}</ElTag>
            <ElTag v-else type="success">{{
              t("adminPermission.externalPermission")
            }}</ElTag>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="order" :label="t('order')" width="100" />
      <ElTableColumn prop="createdAt" :label="t('createdAt')" width="220" />
      <ElTableColumn prop="updatedAt" :label="t('updatedAt')" width="220" />
      <ElTableColumn :label="t('operations')" width="150" fixed="right">
        <template #default="scope">
          <ElButton
            v-permission:edit
            type="primary"
            size="small"
            icon="Edit"
            @click="handleEdit(scope.row)"
          />

          <ElPopconfirm
            :title="t('deleteConfirm')"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <ElButton
                v-permission:delete
                type="danger"
                icon="Delete"
                size="small"
              />
            </template>
          </ElPopconfirm>
        </template>
      </ElTableColumn>
    </AppTable>
  </AppContentBlock>

  <PermissionModal ref="permissionModalRef" @submit="handleSubmit" />
  <PermissionGroupModal ref="permissionGroupModalRef" @submit="handleSubmit" />
</template>
