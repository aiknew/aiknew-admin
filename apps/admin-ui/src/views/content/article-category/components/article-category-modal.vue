<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { computed, h, ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import {
  useArticleCategoryCreate,
  useArticleCategoryUpdate,
  type ArticleCategory
} from '@/api/article-category'
import { tField } from '@aiknew/shared-ui-locales'
import type { TreeList } from '@aiknew/shared-ui-types'
import { useI18n } from 'vue-i18n'

interface Props {
  categories?: TreeList<ArticleCategory>
}

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const { categories } = defineProps<Props>()
const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useI18n()
const modalRef = useTemplateRef('modal')
const editCategory = ref<ArticleCategory>()
const categoriesTree = computed(() => {
  return [
    {
      id: 0,
      translations: langStore.enabledLangs.map((item) => {
        return {
          langKey: item.key,
          name: t('top')
        }
      }),
      children: categories
    }
  ]
})

const { mutateAsync: createArticleCategory } = useArticleCategoryCreate()
const { mutateAsync: updateArticleCategory } = useArticleCategoryUpdate()

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('articleCategory.articleCategoryName')
          }
        },
        label: t('articleCategory.articleCategoryName'),
        name: 'name',
        i18n: true,
        schema: () =>
          buildI18nSchema(
            z
              .string({
                error: t('articleCategory.nameRequired')
              })
              .nonempty({
                error: t('articleCategory.nameRequired')
              })
              .default(''),
            languages
          )
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            style: { width: '200px' },
            valueKey: 'id',
            nodeKey: 'id',
            checkStrictly: true,
            data: categoriesTree.value,
            props: {
              label: (data: ArticleCategory) => tField(data.translations, 'name').value
            }
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
    } else if (modalRef.value?.modalMode === 'edit' && editCategory.value) {
      await updateArticleCategory({ id: editCategory.value.id, body: i18nValues })
    }

    emit('submit')
    handleReset()
  }
})

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('articleCategory.addTitle'))
}

const setDisabled = (route: TreeList<ArticleCategory>[number] | undefined, disabled: boolean) => {
  if (!route) return
  route.disabled = disabled
  if (route.children && route.children.length > 0) {
    route.children.forEach((item) => {
      setDisabled(item, disabled)
    })
  }
}

const edit = (item: ArticleCategory) => {
  editCategory.value = item
  setDisabled(editCategory.value, true)
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('articleCategory.editTitle'))
  modalRef.value?.show()

  formApi.resetI18nValues(item, { keepDefaultValues: true })
}

const handleReset = () => {
  setDisabled(editCategory.value, false)
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
