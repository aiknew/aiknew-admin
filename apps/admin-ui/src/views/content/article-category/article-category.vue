<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed, ref } from 'vue'
import { useLangStore } from '@/stores/lang'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useArticleCategoryI18n } from './composables/use-article-category-i18n'
import { useTemplateRef } from 'vue'
import {
  useArticleCategoryChildren,
  useArticleCategoryDelete,
  useArticleCategoryList,
  type ArticleCategory
} from '@/api/article-category'
import ArticleCategoryModal from './components/article-category-modal.vue'

const { t } = useArticleCategoryI18n()
const langStore = useLangStore()
const { getTranslationField } = langStore
const { currentPage, pageSize } = usePagination()

const appTableRef = useTemplateRef('appTableRef')
const categoryModalRef = useTemplateRef('categoryModalRef')
const {
  data: articleCategoryData,
  refetch: refetchArticleCategoryData,
  isFetching: isFetchingArticleCategoryData
} = useArticleCategoryList(toReactive({ currentPage, pageSize }))
const {
  parentId: expandParentId,
  query: { refetch: fetchArticleCategoryChildren }
} = useArticleCategoryChildren()

const loadChildren = (
  row: ArticleCategory,
  treeNode: unknown,
  resolve: (data: ArticleCategory[]) => void
) => {
  expandParentId.value = row.id
  fetchArticleCategoryChildren()
    .then(({ data }) => {
      const arr = data ?? []
      const res = arr.map((item) => ({ ...item, hasChildren: true }))
      resolve(res)
    })
    .catch(() => {
      resolve([])
    })
}

const { mutateAsync: deleteArticleCategory, isPending: isDeleting } = useArticleCategoryDelete()
const isLoading = computed(() => {
  return isDeleting.value || isFetchingArticleCategoryData.value
})

const handleAdd = () => {
  categoryModalRef.value?.add()
}

const handleEdit = (row: ArticleCategory) => {
  categoryModalRef.value?.edit(row)
}

const refresh = (updatedParentIds: number[]) => {
  // TODO: 只有在updatedId处于展开状态时才更新
  refetchArticleCategoryData().then(({ isSuccess }) => {
    if (isSuccess) {
      updatedParentIds.forEach((id) => {
        expandParentId.value = id
        fetchArticleCategoryChildren().then(({ data }) => {
          if (data) {
            appTableRef.value?.updateKeyChildren(
              String(id),
              data.map((item) => {
                return {
                  ...item,
                  hasChildren: true
                }
              })
            )
          }
        })
      })
    }
  })
}

const handleDelete = async (row: ArticleCategory) => {
  await deleteArticleCategory(row.id)
  refresh([row.parentId])
}

const handleSubmit = ({ updatedParentIds }: { updatedParentIds: number[] }) => {
  refresh(updatedParentIds)
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
      :table-data="articleCategoryData"
      row-key="id"
      tree
      lazy
      :load="loadChildren"
    >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" :label="t('name')" width="180">
        <template #default="{ row }: { row: ArticleCategory }">
          <span>{{ getTranslationField(row.translations, 'name').value }}</span>
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

  <ArticleCategoryModal ref="categoryModalRef" @submit="handleSubmit" />
</template>
