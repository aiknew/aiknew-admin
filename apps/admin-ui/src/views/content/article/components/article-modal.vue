<script lang="ts" setup>
import AppBasicModal from '@/components/common/app-basic-modal.vue'
import { nextTick, h, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppForm, AppFormItemTips, makeFields } from '@/components/common/form'
import { useLangStore } from '@/stores/lang'
import { useArticleCategoryI18n } from '../composables/use-article-i18n'
import { useArticleCategoryData } from '../composables/use-article-category-data'
import { useArticleCreate, useArticleUpdate, type Article } from '@/api/article'
import type { ArticleCategory } from '@/api/article-category'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useArticleCategoryI18n()
const appFormRef = useTemplateRef('appFormRef')
const modalRef = useTemplateRef('modalRef')

const { mutateAsync: createArticle } = useArticleCreate()
const { mutateAsync: updateArticle } = useArticleUpdate()
const {
  editId,
  disabledSelectIds,
  defaultExpandedKeys,
  addDisabledIds,
  fetchArticleCategoryAncestors,
  isDisabled,
  loadNode,
  resetEditId
} = useArticleCategoryData()

const fields = makeFields(
  {
    as: 'ElInput',
    label: 'articleTitle',
    name: 'title',
    translation: true,
    rules: langStore.buildTranslationSchema(
      z.string({ message: 'translationRequired' }).nonempty({ message: 'translationRequired' }),
      ''
    )
  },
  {
    as: 'ElTreeSelect',
    label: 'articleCategory',
    name: 'articleCategoryId',
    rules: z.number(),
    attrs: {
      valueKey: 'id',
      nodeKey: 'id',
      lazy: true,
      checkStrictly: true,
      defaultExpandedKeys,
      props: {
        label: (data: ArticleCategory) =>
          langStore.getTranslationField(data.translations, 'name').value,
        disabled: (data: ArticleCategory) => {
          if (editId.value === 0) {
            return false
          }

          return isDisabled(data.id)
        }
      },
      load: loadNode
    }
  },
  {
    as: 'WangEditor',
    label: 'content',
    name: 'content',
    translation: true,
    rules: langStore.buildTranslationSchema(
      z.string({ message: 'translationRequired' }).nonempty({ message: 'translationRequired' }),
      ''
    )
  },
  {
    as: 'ElSwitch',
    label: 'status',
    name: 'status',
    rules: z.boolean().default(false)
  },
  {
    as: 'ElInputNumber',
    label: 'fakeViewCount',
    name: 'fakeViewCount',
    formItemSlots: {
      default() {
        return [h(AppFormItemTips, { text: t('fakeViewCountTips') })]
      }
    },
    rules: z.number().default(10)
  },
  {
    as: 'ElInputNumber',
    label: 'order',
    name: 'order',
    formItemSlots: {
      default() {
        return [h(AppFormItemTips, { text: t('orderTips') })]
      }
    },
    rules: z.number().default(10)
  }
)

const handleSubmit = () => {
  appFormRef.value?.submit().then(async (values) => {
    if (modalRef.value?.modalMode === 'add') {
      await createArticle(values)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateArticle({ id: editId.value, body: values })
    }

    emit('submit')
    handleReset()
  })
}

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addTitle'))
}

const edit = (item: Article) => {
  editId.value = item.id
  addDisabledIds([item.id])
  fetchArticleCategoryAncestors()
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editTitle'))
  modalRef.value?.show()

  nextTick(() => {
    appFormRef.value?.setFormVals(item)
  })
}

const handleReset = () => {
  resetEditId()
  modalRef.value?.close()
  appFormRef.value?.reset()
  emit('close')
}

defineExpose({
  add,
  edit
})
</script>

<template>
  <AppBasicModal ref="modalRef" @submit="handleSubmit" @close="handleReset">
    <AppForm ref="appFormRef" :t :fields />
  </AppBasicModal>
</template>
