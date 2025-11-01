<script lang="ts" setup>
import { AppContentBlock } from "@aiknew/shared-ui-components"
import { ElTableColumn, ElButton, ElPopconfirm, ElFormItem } from "element-plus"
import { AppTable } from "@aiknew/shared-ui-components"
import { computed, ref } from "vue"
import { usePagination } from "@/composables"
import { useTemplateRef } from "vue"
import {
  useArticleCategoryAll,
  useArticleCategoryDelete,
  type ArticleCategory,
  type QueryArticleCategoryDto,
} from "@/api/article-category"
import ArticleCategoryModal from "./components/article-category-modal.vue"
import { tField } from "@aiknew/shared-ui-locales"
import { buildTree } from "@aiknew/shared-utils"
import { useI18n } from "vue-i18n"
import { toReactive } from "@vueuse/core"
import { useAppForm, type Fields } from "@aiknew/shared-ui-components"
import z from "zod"

const { t } = useI18n()
const { currentPage, pageSize } = usePagination()

const categoryModalRef = useTemplateRef("categoryModalRef")
const query = ref<QueryArticleCategoryDto>({})

const { data: articleCategories, refetch: refetchArticleCategories } =
  useArticleCategoryAll(toReactive(query))
const { mutateAsync: deleteArticleCategory, isPending: isDeleting } =
  useArticleCategoryDelete()
const isLoading = computed(() => {
  return isDeleting.value
})
const articleCategoriesTree = computed(() =>
  buildTree(articleCategories.value, "id", "parentId"),
)

const handleAdd = () => {
  categoryModalRef.value?.add()
}

const handleEdit = (row: ArticleCategory) => {
  categoryModalRef.value?.edit(row)
}

const refresh = () => {
  refetchArticleCategories()
}

const handleDelete = async (row: ArticleCategory) => {
  await deleteArticleCategory(row.id)
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
  onSubmit({ values }) {
    query.value = values
  },
})

const handleResetQueryForm = () => {
  formApi.reset()
  query.value = {}
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
      <ElButton
        v-permission:add
        class="ml-auto"
        type="primary"
        @click="handleAdd"
        >{{ t("add") }}</ElButton
      >
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :pagination="false"
      :table-data="articleCategoriesTree"
      row-key="id"
    >
      <ElTableColumn prop="id" label="ID" width="150" show-overflow-tooltip />
      <ElTableColumn prop="name" :label="t('name')">
        <template #default="{ row }: { row: ArticleCategory }">
          <span>{{ tField(row.translations, "name").value }}</span>
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

  <ArticleCategoryModal
    ref="categoryModalRef"
    :categories="articleCategoriesTree"
    @submit="handleSubmit"
  />
</template>
