<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { h, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useAuthApiI18n } from '../composables/use-auth-api-i18n'
import { useAuthApiCreate, useAuthApiUpdate, type AuthApi } from '@/api/auth-api'
import { useAdminApiData } from '../composables/use-auth-api-data'
import { useUpdatedParentIds } from '@/composables/tree-data/use-updated-parent-ids'
import { tField } from '@aiknew/shared-ui-locales'

interface Emits {
  (e: 'submit', info: { updatedParentIds: string[] }): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useAuthApiI18n()
const modalRef = useTemplateRef('modalRef')

const { mutateAsync: createApi } = useAuthApiCreate()
const { mutateAsync: updateApi } = useAuthApiUpdate()
const { addUpdatedParentId, getUpdatedParentIds } = useUpdatedParentIds()
const {
  editId,
  // disabledSelectIds,
  defaultExpandedKeys,
  addDisabledIds,
  fetchApiAncestors,
  isDisabled,
  loadNode,
  resetEditId
} = useAdminApiData()

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: {
          component: 'ElRadio',
          props: {
            options: [
              { label: 'GET', value: 'GET' },
              { label: 'POST', value: 'POST' },
              { label: 'PATCH', value: 'PATCH' },
              { label: 'PUT', value: 'PUT' },
              { label: 'DELETE', value: 'DELETE' }
            ]
          }
        },
        label: t('requestMethod'),
        name: 'method',
        schema: z
          .union([
            z.literal('GET'),
            z.literal('POST'),
            z.literal('PUT'),
            z.literal('PATCH'),
            z.literal('DELETE')
          ])
          .default('GET')
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            style: { width: '200px' },
            valueKey: 'id',
            nodeKey: 'id',
            lazy: true,
            checkStrictly: true,
            defaultExpandedKeys: defaultExpandedKeys.value,
            props: {
              label: (data: AuthApi) => tField(data.translations, 'apiName').value,
              disabled: (data: AuthApi) => {
                if (editId.value === '0') {
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
        schema: z.string().default('0')
      },
      {
        as: 'ElInput',
        label: t('url'),
        name: 'url',
        schema: z
          .string({ message: t('fillInUrl') })
          .nonempty({ message: t('fillInUrl') })
          .default('')
      },
      {
        as: 'ElInput',
        label: t('apiNameLabel'),
        name: 'apiName',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
        // rules: langStore.buildTranslationSchema(
        //   z.string({ message: 'translationRequired' }).nonempty({ message: 'translationRequired' }),
        //   ''
        // )
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
  async onSubmit({ i18nValues }) {
    if (modalRef.value?.modalMode === 'add') {
      await createApi(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateApi({ id: editId.value, body: i18nValues })
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

const edit = (item: AuthApi) => {
  editId.value = item.id
  addDisabledIds([item.id])
  addUpdatedParentId(item.parentId)
  fetchApiAncestors()
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
  <AppBasicModal ref="modalRef" @submit="formApi.handleSubmit" @close="handleReset">
    <AppForm />
  </AppBasicModal>
</template>
