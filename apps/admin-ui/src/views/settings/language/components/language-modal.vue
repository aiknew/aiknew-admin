<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { useTemplateRef, ref, h } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useI18n } from 'vue-i18n'
import { useEnabledLangList, useLangCreate, useLangUpdate, type LanguageDto } from '@/api/language'
import { LanguageOrientation } from '@aiknew/shared-enums'
import { useLangStore } from '@/stores'

const { t } = useI18n()

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const langStore = useLangStore()
const emit = defineEmits<Emits>()
const modalRef = useTemplateRef('modalRef')
const editKey = ref('')
const editItem = ref<LanguageDto | null>(null)
const { data: enabledLangs, refetch: fetchEnabledLangs } = useEnabledLangList(false)

const { mutateAsync: createLang } = useLangCreate()
const { mutateAsync: updateLang } = useLangUpdate()

const updateEnabledLangs = async () => {
  await fetchEnabledLangs()
  if (enabledLangs.value) {
    langStore.enabledLangs = enabledLangs.value
  }
}

const { AppForm, formApi } = useAppForm({
  fields: () =>
    [
      {
        as: {
          component: 'ElInput'
        },
        label: t('name'),
        name: 'name',
        schema: () =>
          z
            .string({
              error: t('lang.nameRequired')
            })
            .nonempty({
              error: t('lang.nameRequired')
            })
      },

      {
        as: {
          component: 'ElInput'
        },
        label: t('lang.key'),
        name: 'key',
        schema: () =>
          z
            .string({
              error: t('lang.keyRequired')
            })
            .nonempty({
              error: t('lang.keyRequired')
            })
      },

      {
        as: {
          component: 'ElRadio',
          props: {
            options: [
              { label: LanguageOrientation.LTR, value: LanguageOrientation.LTR },
              { label: LanguageOrientation.RTL, value: LanguageOrientation.RTL }
            ]
          }
        },
        label: t('lang.orientation'),
        name: 'orientation',
        schema: z.enum(LanguageOrientation).default('LTR')
      },

      {
        as: {
          component: 'ElSwitch'
        },
        label: t('status'),
        name: 'status',
        schema: z.boolean().default(true).optional()
      },

      {
        as: 'ElInputNumber',
        label: t('order'),
        name: 'order',
        container: {
          bottomSlot() {
            return h(AppFormItemTips, { text: t('orderTips') })
          }
        },
        schema: z.number().default(10)
      }
    ] as const satisfies Fields,
  async onSubmit({ values }) {
    if (modalRef.value?.modalMode === 'add') {
      await createLang(values)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateLang({ key: editKey.value, body: values })
    }

    updateEnabledLangs()
    emit('submit')
    handleReset()
  }
})

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('lang.addTitle'))
}

const edit = (item: LanguageDto) => {
  editKey.value = item.key
  editItem.value = item
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('lang.editTitle'))
  modalRef.value?.show()

  formApi.reset(item, { keepDefaultValues: true })
}

const handleReset = () => {
  editKey.value = ''
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
