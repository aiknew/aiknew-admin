<script lang="ts" setup>
import { AppContentBlock } from "@aiknew/shared-ui-components"
import { ElTableColumn, ElFormItem, ElButton, ElPopconfirm } from "element-plus"
import { AppTable } from "@aiknew/shared-ui-components"
import { computed, ref } from "vue"
import { usePagination } from "@/composables"
import { useTemplateRef } from "vue"
import AuthRoleModal from "./components/auth-role-modal.vue"
import {
  useAuthRoleDelete,
  useAuthRoleList,
  type AuthRole,
  type QueryAuthRoleDto,
} from "@/api/auth-role"
import { tField } from "@aiknew/shared-ui-locales"
import { useI18n } from "vue-i18n"
import { useAppForm, type Fields } from "@aiknew/shared-ui-components"
import z from "zod"

const modalRef = useTemplateRef("modalRef")
const { t } = useI18n()
const { currentPage, pageSize } = usePagination()
const query = ref<QueryAuthRoleDto>({
  currentPage: currentPage.value,
  pageSize: pageSize.value,
})
const {
  data: authRoleData,
  refetch: refetchAuthRoleData,
  isFetching: isFetchingAuthRoleData,
} = useAuthRoleList(query)
const { mutateAsync: deleteAuthRole, isPending: isDeleting } =
  useAuthRoleDelete()

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
        label: t("name"),
        name: "name",
        schema: z.string().default("").optional(),
      },
    ] as const satisfies Fields
  },
  onSubmit({ values: { name } }) {
    query.value = {
      ...query.value,
      name,
    }
  },
})

const handleResetQueryForm = () => {
  formApi.reset()
  query.value = {
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  }
}
</script>

<template>
  <AppContentBlock class="mb-6">
    <QueryForm>
      <ElFormItem>
        <ElButton type="primary" @click="formApi.handleSubmit">{{
          t("submit")
        }}</ElButton>
        <ElButton @click="handleResetQueryForm">{{ t("reset") }}</ElButton>
      </ElFormItem>
    </QueryForm>
  </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <ElButton class="ml-auto" type="primary" @click="handleAdd">{{
        t("add")
      }}</ElButton>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :table-data="authRoleData"
      row-key="id"
    >
      <ElTableColumn prop="id" label="ID" width="150" show-overflow-tooltip />
      <ElTableColumn prop="name" :label="t('name')" min-width="120">
        <template #default="{ row }: { row: AuthRole }">
          <span>{{ tField(row.translations, "roleName").value }}</span>
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

  <AuthRoleModal ref="modalRef" @submit="handleSubmit" />
</template>
