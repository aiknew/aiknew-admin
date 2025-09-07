<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { computed, h, ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useArticleCategoryI18n } from '../composables/use-article-category-i18n'
import {
  useArticleCategoryCreate,
  useArticleCategoryUpdate,
  type ArticleCategory
} from '@/api/article-category'
import { tField } from '@aiknew/shared-ui-locales'
import { buildTree } from '@aiknew/shared-utils'

interface Props {
  categories?: ArticleCategory[]
}

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const { categories } = defineProps<Props>()
const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useArticleCategoryI18n()
const modalRef = useTemplateRef('modal')
const editId = ref<number>()
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
      children: buildTree(categories, 'id', 'parentId')
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
            placeholder: t('articleCategoryName')
          }
        },
        label: t('articleCategoryName'),
        name: 'name',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            style: { width: '200px' },
            valueKey: 'id',
            nodeKey: 'id',
            checkStrictly: true,
            defaultExpandedKeys: [],
            data: categoriesTree.value,
            props: {
              label: (data: ArticleCategory) => tField(data.translations, 'name').value
              // disabled: (data: ArticleCategory) => {
              //   if (editId.value === 0) {
              //     return false
              //   }

              //   return isDisabled(data.id)
              // }
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
    } else if (modalRef.value?.modalMode === 'edit' && editId.value) {
      await updateArticleCategory({ id: editId.value, body: i18nValues })
    }

    emit('submit')
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
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editTitle'))
  modalRef.value?.show()

  formApi.resetI18nValues(item, { keepDefaultValues: true })
}

const handleReset = () => {
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
