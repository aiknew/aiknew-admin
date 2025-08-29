<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import { useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useStorageSettingI18n } from '../composables/use-storage-setting-i18n'
import { useFileStorageCreate, useFileStorageUpdate, type FileStorage } from '@/api/file-storage'
import { convertNullToUndefined } from '@aiknew/shared-utils'
import { FileStorageStatus, StorageType } from '@aiknew/shared-enums'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const { t } = useStorageSettingI18n()
const modalRef = useTemplateRef('modalRef')
const editId = ref<string>('')

const isS3 = ref<boolean>(false)

const { mutateAsync: createFileStorage } = useFileStorageCreate()
const { mutateAsync: updateFileStorage } = useFileStorageUpdate()

const { AppForm, formApi } = useAppForm({
  fields: () =>
    [
      {
        as: {
          component: 'ElRadio',
          props: {
            options: [
              { label: 'LOCAL', value: 'LOCAL' },
              { label: 'S3', value: 'S3' }
            ]
          }
        },
        label: t('storageType'),
        name: 'type',
        schema: z.enum(StorageType).default('LOCAL')
      },

      {
        as: {
          component: 'ElRadio',
          props: {
            options: [
              { label: t('normalStatus'), value: FileStorageStatus.NORMAL },
              { label: t('disabledStatus'), value: FileStorageStatus.DISABLED },
              { label: t('disabledUploadStatus'), value: FileStorageStatus.DISABLED_UPLOAD }
            ]
          }
        },
        label: t('status'),
        name: 'status',
        schema: z.enum(FileStorageStatus).default(FileStorageStatus.NORMAL)
      },

      {
        as: 'ElInput',
        label: t('name'),
        name: 'name',
        schema: z.string().nonempty().default('')
      },
      {
        as: 'ElInput',
        label: t('hostname'),
        name: 'hostname',
        schema: z.url().nonempty().default('')
      },
      {
        when: isS3,
        as: 'ElInput',
        label: t('accessKey'),
        name: 'accessKey',
        schema: z.string().default('').optional()
      },
      {
        when: isS3,
        as: 'ElInput',
        label: t('secretKey'),
        name: 'secretKey',
        schema: z.string().default('').optional()
      },
      {
        when: isS3,
        as: 'ElInput',
        label: t('endpoint'),
        name: 'endpoint',
        schema: z.string().default('').optional()
      },
      {
        when: isS3,
        as: 'ElInput',
        label: t('bucket'),
        name: 'bucket',
        schema: z.string().default('').optional()
      },
      {
        as: 'ElInputNumber',
        label: t('priority'),
        name: 'priority',
        schema: z.number().default(10)
      }
    ] as const satisfies Fields,
  async onSubmit({ i18nValues }) {
    if (modalRef.value?.modalMode === 'add') {
      await createFileStorage(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateFileStorage({ id: editId.value, body: i18nValues })
    }

    emit('submit')
    handleReset()
  }
})

formApi.useStore((state) => {
  const type = state.values.type
  isS3.value = type === 'S3'
})

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

  formApi.reset(convertNullToUndefined(item), { keepDefaultValues: true })
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
