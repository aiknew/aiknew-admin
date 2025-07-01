<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, nextTick, h, computed, useTemplateRef, watch, type Ref } from 'vue'
import { z } from 'zod'
import { AppForm, makeFields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useAdminApiI18n } from '../composables/use-admin-api-i18n'
import {
  useAdminApiChildren,
  useAdminApiCreate,
  useAdminApisAncestors,
  useAdminApiUpdate,
  type AdminApi
} from '@/api/admin-api'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ElMessage } from 'element-plus'
import { useAdminApiData } from '../composables/use-admin-api-data'
import { useUpdatedParentIds } from '@/composables/tree-data/use-updated-parent-ids'

interface Emits {
  (e: 'submit', info: { updatedParentIds: string[] }): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useAdminApiI18n()
const appFormRef = useTemplateRef('appFormRef')
const modalRef = useTemplateRef('modalRef')

const { mutateAsync: createApi } = useAdminApiCreate()
const { mutateAsync: updateApi } = useAdminApiUpdate()
const { addUpdatedParentId, getUpdatedParentIds } = useUpdatedParentIds()
const {
  editId,
  disabledSelectIds,
  defaultExpandedKeys,
  addDisabledIds,
  fetchApiAncestors,
  isDisabled,
  loadNode,
  resetEditId
} = useAdminApiData()

const fields = makeFields(
  {
    as: 'ElRadio',
    label: 'requestMethod',
    name: 'method',
    // Why not use enum: https://github.com/colinhacks/zod/issues/3611
    rules: z
      .union([z.literal('GET'), z.literal('POST'), z.literal('PATCH'), z.literal('DELETE')])
      .default('GET'),
    options: [
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'PATCH', value: 'PATCH' },
      { label: 'DELETE', value: 'DELETE' }
    ]
  },
  {
    as: 'ElTreeSelect',
    label: 'parent',
    name: 'parentId',
    rules: z.string().default('0'),
    attrs: {
      valueKey: 'id',
      nodeKey: 'id',
      lazy: true,
      checkStrictly: true,
      defaultExpandedKeys,
      props: {
        label: (data: AdminApi) =>
          langStore.getTranslationField(data.translations, 'apiName').value,
        disabled: (data: AdminApi) => {
          if (editId.value === '0') {
            return false
          }

          return isDisabled(data.id)
        }
      },
      load: loadNode
    }
  },
  {
    as: 'ElInput',
    label: 'url',
    name: 'url',
    rules: z.string({ message: 'fillInUrl' }).nonempty({ message: 'fillInUrl' })
  },
  {
    as: 'ElInput',
    label: 'apiNameLabel',
    name: 'apiName',
    translation: true,
    rules: langStore.buildTranslationSchema(
      z.string({ message: 'translationRequired' }).nonempty({ message: 'translationRequired' }),
      ''
    )
  },
  {
    as: 'ElInputNumber',
    label: 'order',
    name: 'order',
    formItemSlots: {
      default() {
        return [h('div', { class: ['w-full'] }, t('orderTips'))]
      }
    },
    rules: z.number().default(10)
  }
)

const handleSubmit = () => {
  appFormRef.value?.submit().then(async (values) => {
    if (modalRef.value?.modalMode === 'add') {
      await createApi(values)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateApi({ id: editId.value, body: values })
    }

    addUpdatedParentId(values.parentId)
    emit('submit', {
      updatedParentIds: getUpdatedParentIds()
    })
    handleReset()
  })
}

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addTitle'))
}

const edit = (item: AdminApi) => {
  editId.value = item.id
  addDisabledIds([item.id])
  addUpdatedParentId(item.parentId)
  fetchApiAncestors()
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editTitle'))
  modalRef.value?.show()

  nextTick(() => {
    appFormRef.value?.setFormVals(item)
  })
}

const handleReset = () => {
  resetEditId()
  modalRef.value?.close()
  appFormRef.value?.reset()
  emit('close')
}

defineExpose({
  add,
  edit
})
</script>

<template>
  <AppBasicModal ref="modalRef" @submit="handleSubmit" @close="handleReset">
    <AppForm ref="appFormRef" :t :fields :languages="langStore.enabledLangs" />
  </AppBasicModal>
</template>
