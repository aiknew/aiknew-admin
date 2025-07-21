<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, nextTick, h, computed, useTemplateRef, watch, type Ref } from 'vue'
import { z } from 'zod'
import { AppForm, makeFields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useArticleCategoryI18n } from '../composables/use-article-category-i18n'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ElMessage } from 'element-plus'
import { useUpdatedParentIds } from '@/composables/tree-data/use-updated-parent-ids'
import {
  useArticleCategoryCreate,
  useArticleCategoryUpdate,
  type ArticleCategory
} from '@/api/article-category'
import { useArticleCategoryData } from '../composables/use-article-category-data'
import { tField } from '@aiknew/shared-ui-locales'

interface Emits {
  (e: 'submit', info: { updatedParentIds: number[] }): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useArticleCategoryI18n()
const appFormRef = useTemplateRef('appForm')
const modalRef = useTemplateRef('modal')

const { mutateAsync: createArticleCategory } = useArticleCategoryCreate()
const { mutateAsync: updateArticleCategory } = useArticleCategoryUpdate()
const { addUpdatedParentId, getUpdatedParentIds } = useUpdatedParentIds<number>()
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
    label: 'articleCategoryName',
    name: 'name',
    translation: true,
    rules: langStore.buildTranslationSchema(
      z.string({ message: 'translationRequired' }).nonempty({ message: 'translationRequired' }),
      ''
    )
  },
  {
    as: 'ElTreeSelect',
    label: 'parent',
    name: 'parentId',
    rules: z.number().default(0),
    attrs: {
      valueKey: 'id',
      nodeKey: 'id',
      lazy: true,
      checkStrictly: true,
      defaultExpandedKeys,
      props: {
        label: (data: ArticleCategory) => tField(data.translations, 'name').value,
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
    as: 'ElInputNumber',
    label: 'order',
    name: 'order',
    formItemSlots: {
      default() {
        return [h('div', { class: ['w-full'] }, t('orderTips'))]
      }
    },
    rules: z.number().default(10)
  }
)

const handleSubmit = () => {
  appFormRef.value?.submit().then(async (values) => {
    if (modalRef.value?.modalMode === 'add') {
      await createArticleCategory(values)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateArticleCategory({ id: editId.value, body: values })
    }

    addUpdatedParentId(values.parentId)
    emit('submit', {
      updatedParentIds: getUpdatedParentIds()
    })
    handleReset()
  })
}

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addTitle'))
}

const edit = (item: ArticleCategory) => {
  editId.value = item.id
  addDisabledIds([item.id])
  addUpdatedParentId(item.parentId)
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
  <AppBasicModal ref="modal" @submit="handleSubmit" @close="handleReset">
    <AppForm ref="appForm" :t :fields :languages="langStore.enabledLangs" />
  </AppBasicModal>
</template>
