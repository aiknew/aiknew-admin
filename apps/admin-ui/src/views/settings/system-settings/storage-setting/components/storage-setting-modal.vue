<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, nextTick, useTemplateRef, type ComputedRef, computed } from 'vue'
import { z } from 'zod'
import { AppForm, makeFields } from '@aiknew/shared-ui-form'
import { useStorageSettingI18n } from '../composables/use-storage-setting-i18n'
import { useFileStorageCreate, useFileStorageUpdate, type FileStorage } from '@/api/file-storage'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const { t } = useStorageSettingI18n()
const appFormRef = useTemplateRef('appFormRef')
const modalRef = useTemplateRef('modalRef')
const editId = ref<string>('')

const isS3 = computed<boolean>(
  () => appFormRef.value?.values['type'] === 'S3'
) as ComputedRef<boolean>

const { mutateAsync: createFileStorage } = useFileStorageCreate()
const { mutateAsync: updateFileStorage } = useFileStorageUpdate()

const fields = makeFields(
  {
    as: 'ElRadio',
    label: 'storageType',
    name: 'type',
    rules: z.union([z.literal('LOCAL'), z.literal('S3')]).default('LOCAL'),
    options: [
      { label: 'LOCAL', value: 'LOCAL' },
      { label: 'S3', value: 'S3' }
    ]
  },
  {
    as: 'ElSwitch',
    label: 'enable',
    name: 'enable',
    rules: z.boolean().default(false)
  },
  {
    as: 'ElInput',
    label: 'name',
    name: 'name',
    rules: z.string().nonempty()
  },
  {
    enabled: isS3,
    as: 'ElInput',
    label: 'accessKey',
    name: 'accessKey',
    rules: z.string().optional()
  },
  {
    enabled: isS3,
    as: 'ElInput',
    label: 'secretKey',
    name: 'secretKey',
    rules: z.string().optional()
  },
  {
    enabled: isS3,
    as: 'ElInput',
    label: 'endpoint',
    name: 'endpoint',
    rules: z.string().optional()
  },
  {
    enabled: isS3,
    as: 'ElInput',
    label: 'bucket',
    name: 'bucket',
    rules: z.string().optional()
  }
)

const handleSubmit = () => {
  appFormRef.value?.submit().then(async (values) => {
    if (modalRef.value?.modalMode === 'add') {
      await createFileStorage(values)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateFileStorage({ id: editId.value, body: values })
    }

    emit('submit')
    handleReset()
  })
}

const add = () => {
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addTitle'))
  modalRef.value?.show()
}

const edit = (item: FileStorage) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editTitle'))
  modalRef.value?.show()

  nextTick(() => {
    appFormRef.value?.setFormVals(item)
  })
}

const handleReset = () => {
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
    <AppForm ref="appFormRef" :t :fields />
  </AppBasicModal>
</template>
