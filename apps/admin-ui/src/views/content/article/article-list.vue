<script lang="ts" setup>
import { AppContentBlock } from "@aiknew/shared-ui-components"
import { ElTableColumn, ElButton, ElPopconfirm, ElFormItem } from "element-plus"
import { AppTable } from "@aiknew/shared-ui-components"
import { computed, ref } from "vue"
import { toReactive } from "@vueuse/core"
import { useTemplateRef } from "vue"
import {
  useArticleDelete,
  useArticleList,
  type Article,
  type QueryArticleDto,
} from "@/api/article"
import ArticleModal from "./components/article-modal.vue"
import { tField } from "@aiknew/shared-ui-locales"
import { useI18n } from "vue-i18n"
import { useAppForm, type Fields } from "@aiknew/shared-ui-components"
import z from "zod"

const { t } = useI18n()
const query = ref<QueryArticleDto>({
  currentPage: 1,
  pageSize: 10,
})

const articleModalRef = useTemplateRef("articleModalRef")
const {
  data: articleData,
  refetch: refetchArticleData,
  isFetching: isFetchingArticleData,
} = useArticleList(toReactive(query))

const { mutateAsync: deleteArticle, isPending: isDeleting } = useArticleDelete()
const isLoading = computed(() => {
  return isDeleting.value || isFetchingArticleData.value
})

const handleAdd = () => {
  articleModalRef.value?.add()
}

const handleEdit = (row: Article) => {
  articleModalRef.value?.edit(row)
}

const refresh = () => {
  refetchArticleData()
}

const handleDelete = async (row: Article) => {
  await deleteArticle(row.id)
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
        label: t("article.articleTitle"),
        name: "title",
        schema: z.string().default("").optional(),
      },

      {
        as: {
          component: "ElInput",
        },
        label: t("article.content"),
        name: "content",
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
      <el-form-item>
        <el-button type="primary" @click="formApi.handleSubmit">
          {{ t("submit") }}
        </el-button>
        <el-button @click="handleResetQueryForm">{{ t("reset") }}</el-button>
      </el-form-item>
    </QueryForm>
  </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <ElButton
        v-permission:add
        class="ml-auto"
        type="primary"
        @click="handleAdd"
        >{{ t("add") }}
      </ElButton>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="query.currentPage"
      v-model:page-size="query.pageSize"
      :table-data="articleData"
      row-key="id"
    >
      <ElTableColumn prop="id" label="ID" width="150" show-overflow-tooltip />
      <ElTableColumn prop="title" :label="t('title')">
        <template #default="{ row }: { row: Article }">
          <span>{{ tField(row.translations, "title").value }}</span>
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

  <ArticleModal ref="articleModalRef" @submit="handleSubmit" />
</template>
