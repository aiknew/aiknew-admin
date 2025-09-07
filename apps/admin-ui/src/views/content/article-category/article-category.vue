<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed } from 'vue'
import { usePagination } from '@/composables'
import { useArticleCategoryI18n } from './composables/use-article-category-i18n'
import { useTemplateRef } from 'vue'
import {
  useArticleCategoryAll,
  useArticleCategoryDelete,
  type ArticleCategory
} from '@/api/article-category'
import ArticleCategoryModal from './components/article-category-modal.vue'
import { tField } from '@aiknew/shared-ui-locales'
import { buildTree } from '@aiknew/shared-utils'

const { t } = useArticleCategoryI18n()
const { currentPage, pageSize } = usePagination()

const categoryModalRef = useTemplateRef('categoryModalRef')

const { data: articleCategories, refetch: refetchArticleCategories } = useArticleCategoryAll()
const { mutateAsync: deleteArticleCategory, isPending: isDeleting } = useArticleCategoryDelete()
const isLoading = computed(() => {
  return isDeleting.value
})
const articleCategoriesTree = computed(() => buildTree(articleCategories.value, 'id', 'parentId'))

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
      :pagination="false"
      :table-data="articleCategoriesTree"
      row-key="id"
    >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" :label="t('name')" width="180">
        <template #default="{ row }: { row: ArticleCategory }">
          <span>{{ tField(row.translations, 'name').value }}</span>
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

  <ArticleCategoryModal
    ref="categoryModalRef"
    :categories="articleCategories"
    @submit="handleSubmit"
  />
</template>
