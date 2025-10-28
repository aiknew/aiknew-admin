<script lang="ts" setup>
import { AppContentBlock } from "@aiknew/shared-ui-components"
import { ElTableColumn, ElButton, ElPopconfirm, ElFormItem } from "element-plus"
import { AppTable } from "@aiknew/shared-ui-components"
import { computed, ref } from "vue"
import { toReactive } from "@vueuse/core"
import { useTemplateRef } from "vue"
import {
  useAdminUserDelete,
  useAdminUserList,
  type AdminUser,
  type QueryAdminUserDto,
} from "@/api/admin-user"
import AdminUserModal from "./components/admin-user-modal.vue"
import { useI18n } from "vue-i18n"
import { useAppForm, type Fields } from "@aiknew/shared-ui-components"
import z from "zod"

const modalRef = useTemplateRef("modalRef")
const { t } = useI18n()
// const { currentPage, pageSize } = usePagination()
const query = ref<QueryAdminUserDto>({
  currentPage: 1,
  pageSize: 10,
})

const {
  data: adminUserData,
  refetch: refetchAdminUserData,
  isFetching: isFetchingAdminUserData,
} = useAdminUserList(toReactive(query))
const { mutateAsync: deleteAdminUser, isPending: isDeleting } =
  useAdminUserDelete()
const isLoading = computed(() => {
  return isDeleting.value || isFetchingAdminUserData.value
})

const { AppForm: QueryForm, formApi } = useAppForm({
  formProps: {
    inline: true,
    labelPosition: "left",
  },
  fields() {
    return [
      {
        as: {
          component: "ElInput",
        },
        label: t("adminUser.userName"),
        name: "userName",
        schema: z.string().default("").optional(),
      },
    ] as const satisfies Fields
  },
  onSubmit({ values: { userName } }) {
    query.value = {
      ...query.value,
      userName,
    }
  },
})

const handleResetQueryForm = () => {
  formApi.reset()
  query.value = {
    ...query.value,
    userName: undefined,
  }
}

const handleAdd = () => {
  modalRef.value?.add()
}

const handleEdit = (row: AdminUser) => {
  modalRef.value?.edit(row)
}

const handleDelete = async (row: AdminUser) => {
  await deleteAdminUser(row.id)
  refetchAdminUserData()
}
</script>

<template>
  <AppContentBlock class="mb-6">
    <QueryForm>
      <el-form-item>
        <el-button type="primary" @click="formApi.handleSubmit">{{
          t("submit")
        }}</el-button>
        <el-button @click="handleResetQueryForm">{{ t("reset") }}</el-button>
      </el-form-item>
    </QueryForm>
  </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">{{
        t("add")
      }}</el-button>
    </div>

    <AppTable
      ref="testTableRef"
      v-model:current-page="query.currentPage"
      v-model:page-size="query.pageSize"
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

          <el-popconfirm
            :title="t('deleteConfirm')"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button
                v-permission:delete
                type="danger"
                icon="Delete"
                size="small"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </AppTable>
  </AppContentBlock>

  <AdminUserModal ref="modalRef" @submit="refetchAdminUserData" />
</template>
