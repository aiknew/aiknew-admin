<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { computed, h, ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useArticleI18n } from '../composables/use-article-i18n'
import { useArticleCreate, useArticleUpdate, type Article } from '@/api/article'
import { useArticleCategoryAll, type ArticleCategory } from '@/api/article-category'
import { tField } from '@aiknew/shared-ui-locales'
import { buildTree } from '@aiknew/shared-utils'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useArticleI18n()
const modalRef = useTemplateRef<InstanceType<typeof AppBasicModal>>('modalRef')
const editId = ref<number>()
const { mutateAsync: createArticle } = useArticleCreate()
const { mutateAsync: updateArticle } = useArticleUpdate()
const { data: articleCategories } = useArticleCategoryAll()

const categoriesTree = computed(() => {
  return [
    {
      id: 0,
      translations: langStore.enabledLangs.map((lang) => {
        return {
          langKey: lang.key,
          name: t('top')
        }
      }),
      children: buildTree(articleCategories.value, 'id', 'parentId')
    }
  ]
})

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  fields: () =>
    [
      {
        as: 'ElInput',
        label: t('articleTitle'),
        name: 'title',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
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
        label: t('articleCategory'),
        name: 'articleCategoryId',
        schema: z.number().default(0)
      },
      {
        as: 'WangEditor',
        label: t('content'),
        name: 'content',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
      },
      {
        as: 'ElSwitch',
        label: t('status'),
        name: 'status',
        schema: z.boolean().default(false)
      },
      {
        as: 'ElInputNumber',
        label: t('fakeViewCount'),
        name: 'fakeViewCount',
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('fakeViewCountTips') })
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
  onSubmit: async ({ i18nValues }) => {
    if (modalRef.value?.modalMode === 'add') {
      await createArticle(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit' && editId.value) {
      await updateArticle({ id: editId.value, body: i18nValues })
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

const edit = (item: Article) => {
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
  <AppBasicModal ref="modalRef" @submit="formApi.handleSubmit" @close="handleReset">
    <AppForm />
  </AppBasicModal>
</template>
