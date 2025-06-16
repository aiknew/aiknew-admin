<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import AppFileManager from './app-file-manager.vue'
import AppBasicModal from '@/components/common/app-basic-modal.vue'
import type { FileItem } from './composables'
import { useFileI18n } from './composables/use-file-i18n'

interface AppFileModalEmits {
  (e: 'submit', selectedFiles: FileItem[]): void
  (e: 'close'): void
}

const { t } = useFileI18n()
const emit = defineEmits<AppFileModalEmits>()
const modalRef = ref<InstanceType<typeof AppBasicModal>>()
const fileManagerRef = useTemplateRef('fileManagerRef')

const onSubmit = () => {
  const selectedFiles = fileManagerRef.value?.selectedFiles ?? []
  modalRef.value?.close()
  fileManagerRef.value?.clearSelected()

  emit('submit', selectedFiles)
}

const handleReset = () => {
  modalRef.value?.close()
  emit('close')
}

const show = (title?: string) => {
  if (title) {
    modalRef.value?.setTitle(title ?? t('fileModalTitle'))
  }

  modalRef.value?.show()
}

defineExpose({
  show
})
</script>

<template>
  <AppBasicModal ref="modalRef" @submit="onSubmit" @close="handleReset">
    <AppFileManager ref="fileManagerRef" />
  </AppBasicModal>
</template>

<style lang="scss"></style>
