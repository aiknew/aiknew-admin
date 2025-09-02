<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { useTemplateRef, ref } from 'vue'
import { z } from 'zod'
import { buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useConfigCreate, useConfigUpdate, type Config } from '@/api/config'
import { useConfigI18n } from '../composables/use-config-i18n'

const { t } = useConfigI18n()

interface Emits {
  (e: 'submit', info: { updatedParentIds: string[] }): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const modalRef = useTemplateRef('modalRef')
const editId = ref('')
const editItem = ref<Config | null>(null)

const { mutateAsync: createConfig } = useConfigCreate()
const { mutateAsync: updateConfig } = useConfigUpdate()

const languages = langStore.enabledLangs

const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: 'ElInput',
        label: t('key'),
        name: 'key',
        schema: z
          .string({ message: t('enterKey') })
          .min(1, { message: t('keyRequired') })
          .max(50, { message: t('keyLengthExceeded') })
          .default('')
      },
      {
        as: 'ElInput',
        label: t('value'),
        name: 'value',
        schema: z
          .string({ message: t('enterValue') })
          .min(1, { message: t('valueRequired') })
          .max(200, { message: t('valueLengthExceeded') })
          .default('')
      },
      {
        as: {
          component: 'ElRadio',
          props: {
            options: [
              { label: t('userConfig'), value: false },
              { label: t('systemConfig'), value: true }
            ]
          }
        },
        label: t('configType'),
        name: 'system',
        schema: z.boolean().default(false)
      },
      {
        as: 'ElInput',
        label: t('name'),
        name: 'name',
        i18n: true,
        schema: buildI18nSchema(
          z
            .string({ message: t('enterName') })
            .min(1, { message: t('nameRequired') })
            .max(50, { message: t('nameLengthExceeded') })
            .default(''),
          languages
        )
      },
      {
        as: 'ElInput',
        label: t('remark'),
        name: 'remark',
        i18n: true,
        schema: buildI18nSchema(
          z
            .string({ message: t('enterRemark') })
            .max(200, { message: t('remarkLengthExceeded') })
            .optional()
            .default(''),
          languages
        )
      }
    ] as const satisfies Fields,
  async onSubmit({ i18nValues }) {
    if (modalRef.value?.modalMode === 'add') {
      await createConfig(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateConfig({ id: editId.value, body: i18nValues })
    }

    emit('submit', {
      updatedParentIds: ['0']
    })
    handleReset()
  }
})

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addConfig'))
}

const edit = (item: Config) => {
  editId.value = item.id
  editItem.value = item
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editConfig'))
  modalRef.value?.show()

  formApi.resetI18nValues(item, { keepDefaultValues: true })
}

const handleReset = () => {
  editId.value = ''
  editItem.value = null
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
