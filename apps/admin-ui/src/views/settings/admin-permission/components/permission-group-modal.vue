<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { h, ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { usePermissionGroupCreate, usePermissionGroupUpdate } from '@/api/permission-group'
import type { PermissionGroup } from '@/api/permission'
import { usePermissionI18n } from '../composables/use-permission-i18n'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = usePermissionI18n()
const modalRef = useTemplateRef('modalRef')
const editId = ref('')

const { mutateAsync: createPermissionGroup } = usePermissionGroupCreate()
const { mutateAsync: updatePermissionGroup } = usePermissionGroupUpdate()

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: 'ElInput',
        label: t('permissionGroupName'),
        name: 'groupName',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
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
      await createPermissionGroup(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updatePermissionGroup({ id: editId.value, body: i18nValues })
    }

    emit('submit')
    handleReset()
  }
})

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('adPermissionGroup'))
}

const edit = (item: PermissionGroup) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editPermissionGroup'))
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
