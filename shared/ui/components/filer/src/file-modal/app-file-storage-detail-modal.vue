<script setup lang="ts">
import { useFileI18n } from '@/composables/use-file-i18n'
import { AppBasicModal } from '@aiknew/shared-ui-components'
import type { FileStorageStatus, StorageType } from '@aiknew/shared-types'
import { useAppForm } from '@aiknew/shared-ui-form'
import { h, reactive, useTemplateRef } from 'vue'
import dayjs from 'dayjs'

export interface Data {
  name?: string
  type?: StorageType
  hostname?: string
  status?: FileStorageStatus
  createdAt?: Date | string
  updatedAt?: Date | string
}

const modalRef = useTemplateRef<InstanceType<typeof AppBasicModal>>('modal')
const storage = reactive<Data>({})
const { t } = useFileI18n()
const { AppForm } = useAppForm({
  fields() {
    return [
      {
        exclude: true,
        label: t('name'),
        container: {
          content: h('span', storage.name),
        },
      },

      {
        exclude: true,
        label: t('type'),
        container: {
          content: h('span', storage.type),
        },
      },

      {
        exclude: true,
        label: t('hostname'),
        container: {
          content: h('span', storage.hostname),
        },
      },

      {
        exclude: true,
        label: t('status'),
        container: {
          content: h('span', storage.status),
        },
      },

      {
        exclude: true,
        label: t('createdAt'),
        container: {
          content: h(
            'span',
            dayjs(storage.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          ),
        },
      },

      {
        exclude: true,
        label: t('updatedAt'),
        container: {
          content: h(
            'span',
            dayjs(storage.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
          ),
        },
      },
    ]
  },
})

const show = (data?: Data) => {
  modalRef.value?.setModalMode('show')
  modalRef.value?.setTitle(t('storageDetailModalTitle'))
  modalRef.value?.show()
  if (data) {
    Object.assign(storage, data)
  }
}

defineExpose({
  show,
})
</script>

<template>
  <AppBasicModal ref="modal" :show-footer="false">
    <AppForm />
  </AppBasicModal>
</template>
