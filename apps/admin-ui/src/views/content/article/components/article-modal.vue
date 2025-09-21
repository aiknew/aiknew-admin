<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { computed, h, ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import {
  AppFormItemTips,
  buildI18nSchema,
  useAppForm,
  type Fields
} from '@aiknew/shared-ui-components'
import { useLangStore } from '@/stores/lang'
import { useArticleCreate, useArticleUpdate, type Article } from '@/api/article'
import { useArticleCategoryAll, type ArticleCategory } from '@/api/article-category'
import { tField } from '@aiknew/shared-ui-locales'
import { buildTree } from '@aiknew/shared-utils'
import { useI18n } from 'vue-i18n'
import AdminEditor from '@/components/editor/admin-editor.vue'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useI18n()
const modalRef = useTemplateRef<InstanceType<typeof AppBasicModal>>('modalRef')
const editId = ref<number>()
const { mutateAsync: createArticle } = useArticleCreate()
const { mutateAsync: updateArticle } = useArticleUpdate()
const { data: articleCategories } = useArticleCategoryAll()

const categoriesTree = computed(() => {
  return buildTree(articleCategories.value, 'id', 'parentId')
})

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  fields: () =>
    [
      {
        as: 'ElInput',
        label: t('article.articleTitle'),
        name: 'title',
        i18n: true,
        schema: () =>
          buildI18nSchema(
            z
              .string({
                error: t('article.titleRequired')
              })
              .nonempty({
                error: t('article.titleRequired')
              })
              .default(''),
            languages
          )
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            style: { minWidth: '200px' },
            valueKey: 'id',
            nodeKey: 'id',
            checkStrictly: true,
            props: {
              label: (data: ArticleCategory) => tField(data.translations, 'name').value
            },
            data: categoriesTree.value
          }
        },
        label: t('article.articleCategory'),
        name: 'articleCategoryId',
        schema: () =>
          z
            .number({
              error: t('article.articleCategoryIdRequired')
            })
            .min(1, {
              error: t('article.articleCategoryIdRequired')
            })
      },
      {
        as: AdminEditor,
        label: t('article.content'),
        name: 'content',
        i18n: true,
        schema: () =>
          buildI18nSchema(
            z
              .string({
                error: t('article.contentRequired')
              })
              .nonempty({
                error: t('article.contentRequired')
              })
              .default(''),
            languages
          )
      },
      {
        as: 'ElSwitch',
        label: t('status'),
        name: 'status',
        schema: z.boolean().default(false)
      },
      {
        as: 'ElInputNumber',
        label: t('article.fakeViewCount'),
        name: 'fakeViewCount',
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('article.fakeViewCountTips') })
        },
        schema: z.number().default(10)
      },
      {
        as: 'ElInputNumber',
        label: t('order'),
        name: 'order',
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('orderTips') })
        },
        schema: z.number().default(10)
      }
    ] as const satisfies Fields,
  languages,
  onSubmit: async ({ values }) => {
    if (modalRef.value?.modalMode === 'add') {
      await createArticle(values)
    } else if (modalRef.value?.modalMode === 'edit' && editId.value) {
      await updateArticle({ id: editId.value, body: values })
    }

    emit('submit')
    handleReset()
  }
})

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('article.addTitle'))
}

const edit = (item: Article) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('article.editTitle'))
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
  <AppBasicModal ref="modalRef" @submit="formApi.handleSubmit" @close="handleReset">
    <AppForm />
  </AppBasicModal>
</template>
