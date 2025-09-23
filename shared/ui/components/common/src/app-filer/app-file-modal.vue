<script setup lang="ts">
import { useTemplateRef } from 'vue'
import AppFileManager, {
  type Props as FileManagerProps,
} from './app-file-manager.vue'
import AppBasicModal from '../app-basic-modal.vue'
import type { IUploadFile, IUploadFileQuery } from '@aiknew/shared-types'
import { useI18n } from 'vue-i18n'

export interface Props extends FileManagerProps {}

export interface Emits {
  (e: 'submit', selectedFiles: IUploadFile[]): void
  (e: 'refresh'): void
  (e: 'close'): void
}

const queryModel = defineModel<IUploadFileQuery>('query', {
  default: {
    currentPage: 1,
    keyword: '',
    pageSize: 10,
    parentId: '0',
  },
})

const { t } = useI18n()
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
    modalRef.value?.setTitle(title ?? t('filer.fileModalTitle'))
  }

  modalRef.value?.show()
}

defineExpose({
  show,
})
</script>

<template>
  <AppBasicModal ref="modal" @submit="onSubmit" @close="handleReset">
    <AppFileManager
      v-model:query="queryModel"
      ref="fileManager"
      v-bind="$props"
      @refresh="$emit('refresh')"
    />
  </AppBasicModal>
</template>
