<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { h, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useArticleCategoryI18n } from '../composables/use-article-category-i18n'
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
const modalRef = useTemplateRef('modal')

const { mutateAsync: createArticleCategory } = useArticleCategoryCreate()
const { mutateAsync: updateArticleCategory } = useArticleCategoryUpdate()
const { addUpdatedParentId, getUpdatedParentIds } = useUpdatedParentIds<number>()
const {
  editId,
  // disabledSelectIds,
  defaultExpandedKeys,
  addDisabledIds,
  fetchArticleCategoryAncestors,
  isDisabled,
  loadNode,
  resetEditId
} = useArticleCategoryData()

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('articleCategoryName')
          }
        },
        label: t('articleCategoryName'),
        name: 'name',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
        // rules: langStore.buildTranslationSchema(
        //   z.string({ message: 'translationRequired' }).nonempty({ message: 'translationRequired' }),
        //   ''
        // )
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            valueKey: 'id',
            nodeKey: 'id',
            lazy: true,
            checkStrictly: true,
            defaultExpandedKeys: defaultExpandedKeys.value,
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
        label: t('parent'),
        name: 'parentId',
        schema: z.number().default(0)
      },
      {
        as: {
          component: 'ElInputNumber',
          props: {
            min: 0
          }
        },
        label: t('order'),
        name: 'order',
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('orderTips') })
        },
        schema: z.number().default(10)
      }
    ] as const satisfies Fields,
  onSubmit: async ({ i18nValues }) => {
    if (modalRef.value?.modalMode === 'add') {
      await createArticleCategory(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateArticleCategory({ id: editId.value, body: i18nValues })
    }

    addUpdatedParentId(i18nValues.parentId)
    emit('submit', {
      updatedParentIds: getUpdatedParentIds()
    })
    handleReset()
  }
})

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

  formApi.resetI18nValues(item, { keepDefaultValues: true })
}

const handleReset = () => {
  resetEditId()
  modalRef.value?.close()
  formApi.reset()
  emit('close')
}

defineExpose({
  add,
  edit
})
</script>

<template>
  <AppBasicModal ref="modal" @submit="formApi.handleSubmit" @close="handleReset">
    <AppForm />
  </AppBasicModal>
</template>
