<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { computed, h, ref, useTemplateRef, watch } from 'vue'
import { z } from 'zod'
import { buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-components'
import { useDictCreate, useDictUpdate, type Dict } from '@/api/dict'
import { useLangStore } from '@/stores/lang'
import { useI18n } from 'vue-i18n'
import type { DictType } from '@/api/dict-type'
import { tField } from '@aiknew/shared-ui-locales'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const dictType = defineModel<DictType>('dictType')

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useI18n()
const modalRef = useTemplateRef('modal')

const { mutateAsync: createDict } = useDictCreate()
const { mutateAsync: updateDict } = useDictUpdate()

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        exclude: true,
        container: {
          content: h(
            'div',
            computed(() => {
              if (dictType.value) {
                return tField(dictType.value.translations, 'name').value ?? ''
              }

              return ''
            }).value
          )
        },
        label: t('dictType.dictTypeName')
      },
      {
        hidden: true,
        as: {
          component: 'ElInput',
          props: {
            disabled: true
          }
        },
        label: '',
        name: 'dictTypeId',
        schema: z.string().nonempty().default('')
      },
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('dictType.dictLabel')
          }
        },
        label: t('dictType.dictLabel'),
        name: 'label',
        i18n: true,
        schema: () =>
          buildI18nSchema(
            z
              .string({
                error: t('dictType.labelRequired')
              })
              .nonempty({
                error: t('dictType.labelRequired')
              })
              .default(''),
            languages
          )
      },
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('dictType.dictValue')
          }
        },
        label: t('dictType.dictValue'),
        name: 'value',
        schema: () =>
          z
            .string({
              error: t('dictType.valueRequired')
            })
            .nonempty({
              error: t('dictType.valueRequired')
            })
            .default('')
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
        schema: z.number().default(10)
      },
      {
        as: {
          component: 'ElSwitch'
        },
        label: t('status'),
        name: 'status',
        schema: z.boolean().default(true)
      },
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('remark')
          }
        },
        label: t('remark'),
        name: 'remark',
        i18n: true,
        schema: buildI18nSchema(z.string().default(''), languages)
      }
    ] as const satisfies Fields,
  onSubmit: async ({ i18nValues }) => {
    if (modalRef.value?.modalMode === 'add') {
      await createDict(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit' && editId.value) {
      await updateDict({ id: editId.value, body: i18nValues })
    }

    emit('submit')
    handleReset()
  }
})

const editId = ref('')

watch(
  dictType,
  (val) => {
    if (val) {
      formApi.setFieldValue('dictTypeId', val.id)
    }
  },
  { immediate: true }
)

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('dictType.addDictTitle'))
}

const edit = (item: Dict) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('dictType.editDictTitle'))
  modalRef.value?.show()

  formApi.resetI18nValues(item, { keepDefaultValues: true })
}

const handleReset = () => {
  editId.value = ''
  modalRef.value?.close()
  formApi.reset()
  if (dictType.value) {
    formApi.setFieldValue('dictTypeId', dictType.value.id)
  }

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
