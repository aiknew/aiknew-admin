<script setup lang="ts">
import AppBasicModal from '../../app-basic-modal.vue'
import { useAppForm } from '../../app-form'
import { h, reactive, useTemplateRef } from 'vue'
import dayjs from 'dayjs'
import type { FileStorageStatus, StorageType } from '@aiknew/shared-enums'
import { useI18n } from 'vue-i18n'

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
const { t } = useI18n()
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
        label: t('filer.hostname'),
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
  modalRef.value?.setTitle(t('filer.storageDetailModalTitle'))
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
