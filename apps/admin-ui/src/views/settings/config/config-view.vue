<script lang="ts" setup>
import { AppContentBlock } from "@aiknew/shared-ui-components"
import {
  ElTableColumn,
  ElButton,
  ElPopconfirm,
  ElTag,
  ElFormItem,
} from "element-plus"
import { AppTable } from "@aiknew/shared-ui-components"
import { computed, ref } from "vue"
import {
  useConfigDelete,
  useConfigList,
  type SystemConfig,
  type QuerySystemConfigDto,
} from "@/api/system-config"
import { toReactive } from "@vueuse/core"
import { useTemplateRef } from "vue"
import ConfigModal from "./components/config-modal.vue"
import { tField } from "@aiknew/shared-ui-locales"
import { useI18n } from "vue-i18n"
import { useAppForm, type Fields } from "@aiknew/shared-ui-components"
import z from "zod"

const configModalRef = useTemplateRef("configModalRef")
const { t } = useI18n()
const query = ref<QuerySystemConfigDto>({
  currentPage: 1,
  pageSize: 10,
})

const {
  data: configData,
  refetch: refetchConfigData,
  isFetching: isFetchingConfigData,
} = useConfigList(toReactive(query))

const { mutateAsync: deleteConfig, isPending: isDeleting } = useConfigDelete()
const isLoading = computed(() => {
  return isDeleting.value || isFetchingConfigData.value
})

const handleAdd = () => {
  configModalRef.value?.add()
}

const handleEdit = (row: SystemConfig) => {
  configModalRef.value?.edit(row)
}

const refresh = () => {
  refetchConfigData()
}

const handleDelete = async (row: SystemConfig) => {
  await deleteConfig(row.id)
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

      {
        as: {
          component: "ElInput",
        },
        label: t("configView.remark"),
        name: "remark",
        schema: z.string().default("").optional(),
      },

      {
        as: {
          component: "ElInput",
        },
        label: t("configView.key"),
        name: "key",
        schema: z.string().default("").optional(),
      },

      {
        as: {
          component: "ElInput",
        },
        label: t("configView.value"),
        name: "value",
        schema: z.string().default("").optional(),
      },
    ] as const satisfies Fields
  },
  onSubmit({ values }) {
    query.value = {
      ...query.value,
      ...values,
    }
  },
})

const handleResetQueryForm = () => {
  formApi.reset()
  query.value = {
    currentPage: 1,
    pageSize: 10,
  }
}
</script>

<template>
  <AppContentBlock class="mb-6">
    <QueryForm>
      <ElFormItem>
        <ElButton type="primary" @click="formApi.handleSubmit">
          {{ t("submit") }}
        </ElButton>
        <ElButton @click="handleResetQueryForm">{{ t("reset") }}</ElButton>
      </ElFormItem>
    </QueryForm>
  </AppContentBlock>

  <AppContentBlock class="mb-6" v-loading="isLoading">
    <div class="mb-3 flex">
      <ElButton class="ml-auto" type="primary" @click="handleAdd">{{
        t("add")
      }}</ElButton>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="query.currentPage"
      v-model:page-size="query.pageSize"
      :table-data="configData"
    >
      <ElTableColumn prop="id" label="ID" width="150" show-overflow-tooltip />
      <ElTableColumn :label="t('configView.name')" width="200">
        <template #default="{ row }: { row: SystemConfig }">
          <span>{{ tField(row.translations, "name").value }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="key" :label="t('configView.key')" width="150" />
      <ElTableColumn prop="value" :label="t('configView.value')" width="150" />
      <ElTableColumn
        prop="system"
        :label="t('configView.configType')"
        width="120"
        align="center"
      >
        <template #default="{ row }">
          <ElTag v-if="row.system" type="danger">{{
            t("configView.system")
          }}</ElTag>
          <ElTag v-else type="primary">{{ t("configView.user") }}</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="t('configView.remark')" show-overflow-tooltip>
        <template #default="{ row }: { row: SystemConfig }">
          <span>{{ tField(row.translations, "remark").value }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="createdAt" :label="t('createdAt')" width="180" />
      <ElTableColumn prop="updatedAt" :label="t('updatedAt')" width="180" />
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
            @confirm="() => handleDelete(scope.row)"
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

    <ConfigModal ref="configModalRef" @submit="handleSubmit" />
  </AppContentBlock>
</template>
