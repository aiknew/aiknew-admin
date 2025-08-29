<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import { buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useDictTypeI18n } from '../composables/use-dict-type-i18n'
import { useDictTypeCreate, useDictTypeUpdate, type DictType } from '@/api/dict-type'
import { useLangStore } from '@/stores/lang'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useDictTypeI18n()
const modalRef = useTemplateRef('modal')

const { mutateAsync: createDictType } = useDictTypeCreate()
const { mutateAsync: updateDictType } = useDictTypeUpdate()

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('key')
          }
        },
        label: t('key'),
        name: 'key',
        schema: z.string().nonempty().default('')
      },
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('dictTypeName')
          }
        },
        label: t('dictTypeName'),
        name: 'name',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
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
      }
    ] as const satisfies Fields,
  onSubmit: async ({ i18nValues }) => {
    if (modalRef.value?.modalMode === 'add') {
      await createDictType(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit' && editId.value) {
      await updateDictType({ id: editId.value, body: i18nValues })
    }

    emit('submit')
    handleReset()
  }
})

const editId = ref('')

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addTitle'))
}

const edit = (item: DictType) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editTitle'))
  modalRef.value?.show()

  formApi.resetI18nValues(item, { keepDefaultValues: true })
}

const handleReset = () => {
  editId.value = ''
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
