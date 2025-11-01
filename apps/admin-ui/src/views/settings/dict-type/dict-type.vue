<script lang="ts" setup>
import { AppContentBlock } from "@aiknew/shared-ui-components"
import {
  ElLink,
  ElTableColumn,
  ElButton,
  ElPopconfirm,
  ElSwitch,
  ElFormItem,
} from "element-plus"
import { AppTable } from "@aiknew/shared-ui-components"
import { computed, ref } from "vue"
import { toReactive } from "@vueuse/core"
import { useI18n } from "vue-i18n"
import { useTemplateRef } from "vue"
import {
  useDictTypeList,
  useDictTypeDelete,
  type DictType,
  useDictTypeUpdate,
  type QueryDictTypeDto,
} from "@/api/dict-type"
import DictTypeModal from "./components/dict-type-modal.vue"
import { tField } from "@aiknew/shared-ui-locales"
import DictItemsDrawer from "./components/dict-items-drawer.vue"
import { useAppForm, type Fields } from "@aiknew/shared-ui-components"
import z from "zod"

const { t } = useI18n()
const query = ref<QueryDictTypeDto>({
  currentPage: 1,
  pageSize: 10,
})

const dictTypeModalRef = useTemplateRef("dictTypeModalRef")
const dictItemsDrawerRef = useTemplateRef("dictItemsDrawer")

const {
  data: dictTypeData,
  refetch: refetchDictTypeData,
  isFetching: isFetchingDictTypeData,
} = useDictTypeList(toReactive(query))
const { mutateAsync: updateDictType } = useDictTypeUpdate()

const { mutateAsync: deleteDictType, isPending: isDeleting } =
  useDictTypeDelete()

const isLoading = computed(() => {
  return isDeleting.value || isFetchingDictTypeData.value
})

const handleAdd = () => {
  dictTypeModalRef.value?.add()
}

const handleEdit = (row: DictType) => {
  dictTypeModalRef.value?.edit(row)
}

const handleDelete = async (row: DictType) => {
  await deleteDictType(row.id)
  refetchDictTypeData()
}

const handleToggleStatus = async (row: DictType) => {
  await updateDictType({
    id: row.id,
    body: {
      status: row.status,
    },
  })
  refetchDictTypeData()
}

const handleSubmit = () => {
  refetchDictTypeData()
}

const handleCheckItems = (row: DictType) => {
  dictItemsDrawerRef.value?.show(tField(row.translations, "name").value, row)
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
        label: t("dictType.key"),
        name: "key",
        schema: z.string().default("").optional(),
      },

      {
        as: {
          component: "ElInput",
        },
        label: t("remark"),
        name: "remark",
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

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <ElButton class="ml-auto" type="primary" @click="handleAdd">
        {{ t("add") }}
      </ElButton>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="query.currentPage"
      v-model:page-size="query.pageSize"
      :table-data="dictTypeData"
    >
      <ElTableColumn prop="key" :label="t('dictType.key')" width="150" />
      <ElTableColumn
        prop="name"
        :label="t('dictType.dictTypeName')"
        align="center"
        width="150"
        show-overflow-tooltip
      >
        <template #default="{ row }: { row: DictType }">
          <span>{{ tField(row.translations, "name").value }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn :label="t('dictType.dictItem')" align="center">
        <template #default="{ row }: { row: DictType }">
          <ElLink type="primary" @click="handleCheckItems(row)">{{
            t("check")
          }}</ElLink>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="order" :label="t('order')" width="100" />
      <ElTableColumn prop="status" :label="t('status')" width="100">
        <template #default="{ row }: { row: DictType }">
          <ElSwitch v-model="row.status" @change="handleToggleStatus(row)" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="createdAt" :label="t('createdAt')" width="200" />
      <ElTableColumn prop="updatedAt" :label="t('updatedAt')" width="200" />
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

  <DictTypeModal ref="dictTypeModalRef" @submit="handleSubmit" />
  <DictItemsDrawer ref="dictItemsDrawer" />
</template>
