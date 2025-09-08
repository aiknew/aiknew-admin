<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed } from 'vue'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useArticleI18n } from './composables/use-article-i18n'
import { useTemplateRef } from 'vue'
import { useArticleDelete, useArticleList, type Article } from '@/api/article'
import ArticleModal from './components/article-modal.vue'
import { tField } from '@aiknew/shared-ui-locales'

const { t } = useArticleI18n()
const { currentPage, pageSize } = usePagination()

const appTableRef = useTemplateRef('appTableRef')
const articleModalRef = useTemplateRef('articleModalRef')
const {
  data: articleData,
  refetch: refetchArticleData,
  isFetching: isFetchingArticleData
} = useArticleList(toReactive({ currentPage, pageSize }))

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
      :table-data="articleData"
      row-key="id"
    >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="title" :label="t('title')" width="180">
        <template #default="{ row }: { row: Article }">
          <span>{{ tField(row.translations, 'title').value }}</span>
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

  <ArticleModal ref="articleModalRef" @submit="handleSubmit" />
</template>
