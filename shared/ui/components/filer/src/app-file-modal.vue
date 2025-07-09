<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import AppFileManager, {
  type Props as FileManagerProps,
} from './app-file-manager.vue'
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { useFileI18n } from './composables/use-file-i18n'
import type { IUploadFile } from '@aiknew/shared-types'

export interface Props extends FileManagerProps {}

export interface Emits {
  (e: 'submit', selectedFiles: IUploadFile[]): void
  (e: 'close'): void
}

const { t } = useFileI18n()
defineProps<FileManagerProps>()
const emit = defineEmits<Emits>()
const modalRef = useTemplateRef<InstanceType<typeof AppBasicModal>>('modal')
const fileManagerRef = useTemplateRef('fileManager')

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
  show,
})
</script>

<template>
  <AppBasicModal ref="modal" @submit="onSubmit" @close="handleReset">
    <AppFileManager ref="fileManager" v-bind="$props" />
  </AppBasicModal>
</template>
