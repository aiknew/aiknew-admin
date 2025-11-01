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
import { toReactive } from "@vueuse/core"
import { useTemplateRef } from "vue"
import LanguageModal from "./components/language-modal.vue"
import { useI18n } from "vue-i18n"
import { useAppForm, type Fields } from "@aiknew/shared-ui-components"
import z from "zod"
import {
  useLangDelete,
  useLangList,
  type LanguageDto,
  type QueryLanguageDto,
} from "@/api/language"
import { LanguageOrientation } from "@aiknew/shared-enums"

const langModalRef = useTemplateRef("langModalRef")
const { t } = useI18n()
const query = ref<QueryLanguageDto>({
  currentPage: 1,
  pageSize: 10,
})

const {
  data: configData,
  refetch: refetchLangData,
  isFetching: isFetchingLangs,
} = useLangList(toReactive(query))

const { mutateAsync: deleteLang, isPending: isDeleting } = useLangDelete()
const isLoading = computed(() => {
  return isDeleting.value || isFetchingLangs.value
})

const handleAdd = () => {
  langModalRef.value?.add()
}

const handleEdit = (row: LanguageDto) => {
  langModalRef.value?.edit(row)
}

const refresh = () => {
  refetchLangData()
}

const handleDelete = async (row: LanguageDto) => {
  await deleteLang(row.key)
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
        label: t("lang.key"),
        name: "key",
        schema: z.string().default("").optional(),
      },

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
          component: "ElSelectV2",
          props: {
            style: { minWidth: "100px" },
            options: [
              {
                label: LanguageOrientation.LTR,
                value: LanguageOrientation.LTR,
              },
              {
                label: LanguageOrientation.RTL,
                value: LanguageOrientation.RTL,
              },
            ],
          },
        },
        label: t("lang.orientation"),
        name: "orientation",
        schema: z.enum(LanguageOrientation).default("LTR").optional(),
      },

      {
        as: {
          component: "ElSelectV2",
          props: {
            style: { minWidth: "100px" },
            options: [
              { label: t("enabled"), value: true },
              { label: t("disabled"), value: false },
            ],
          },
        },
        label: t("status"),
        name: "status",
        schema: z.boolean().default(true).optional(),
      },
    ] as const satisfies Fields
  },
  onSubmit({ values }) {
    console.log(values)
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
      <ElTableColumn prop="key" :label="t('lang.key')" width="150" />
      <ElTableColumn prop="name" :label="t('name')" />
      <ElTableColumn
        prop="orientation"
        :label="t('lang.orientation')"
        width="80"
      />
      <ElTableColumn
        prop="system"
        :label="t('status')"
        width="120"
        align="center"
      >
        <template #default="{ row }">
          <ElTag v-if="!row.status" type="danger">{{ t("disabled") }}</ElTag>
          <ElTag v-else type="primary">{{ t("enabled") }}</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="order" :label="t('order')" width="120" />
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

    <LanguageModal ref="langModalRef" @submit="handleSubmit" />
  </AppContentBlock>
</template>
