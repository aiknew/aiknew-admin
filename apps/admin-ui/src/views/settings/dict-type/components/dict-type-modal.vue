<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { computed, ref, useTemplateRef, type ComputedRef } from 'vue'
import { z } from 'zod'
import { buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-components'
import { useI18n } from 'vue-i18n'
import { useDictTypeCreate, useDictTypeUpdate, type DictType } from '@/api/dict-type'
import { useLangStore } from '@/stores/lang'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useI18n()
const modalRef = useTemplateRef('modal')
const disabledEditKey = computed(() => {
  return modalRef.value?.modalMode === 'edit'
}) as ComputedRef<boolean>

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
            placeholder: t('dictType.dictTypeName')
          }
        },
        label: t('dictType.dictTypeName'),
        name: 'name',
        i18n: true,
        schema: () =>
          buildI18nSchema(
            z
              .string({
                error: t('dictType.nameRequired')
              })
              .nonempty({
                error: t('dictType.nameRequired')
              })
              .default(''),
            languages
          )
      },
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('dictType.key'),
            disabled: disabledEditKey.value
          }
        },
        label: t('dictType.key'),
        name: 'key',
        schema: () =>
          z
            .string({
              error: t('dictType.keyRequired')
            })
            .nonempty({
              error: t('dictType.keyRequired')
            })
            .default('')
      },
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('remark'),
            type: 'textarea'
          }
        },
        label: t('remark'),
        name: 'remark',
        i18n: true,
        schema: buildI18nSchema(z.string().default(''), languages)
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
  modalRef.value?.setTitle(t('dictType.addTitle'))
}

const edit = (item: DictType) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('dictType.editTitle'))
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
