<script setup lang="ts">
import { Ref, ref, useTemplateRef } from 'vue'
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ElMessage, ElUpload, ElIcon } from 'element-plus'
import { useFileI18n } from '../composables/use-file-i18n'

export interface Props {
  currentGroupId: string | undefined
  uploadUrl: string
  uploadHeaders: Record<string, string>
  beforeUpload?: (extraFormData: Ref<Record<string, unknown>>) => void
}

export interface Emits {
  (e: 'close'): void
}

defineEmits<Emits>()
const { currentGroupId, uploadHeaders, uploadUrl, beforeUpload } =
  defineProps<Props>()
const { t } = useFileI18n()

const modalRef = useTemplateRef('modal')
const extraData = ref<Record<string, unknown>>({})

const onBeforeUpload = () => {
  extraData.value = {
    groupId: currentGroupId,
  }
  return beforeUpload && beforeUpload(extraData)
}

const onSuccess = (response: { msg: string }) => {
  ElMessage.success({
    message: response.msg,
  })
}

const onError = (err: Error) => {
  ElMessage.error({
    message: JSON.parse(err.message).msg,
  })
}

const show = () => {
  modalRef.value?.setTitle(t('uploadFileModalTitle'))
  modalRef.value?.show()
}

defineExpose({
  show,
})
</script>

<template>
  <AppBasicModal
    append-to-body
    ref="modal"
    :show-footer="false"
    @close="$emit('close')"
  >
    <el-upload
      drag
      multiple
      :action="uploadUrl"
      :headers="uploadHeaders"
      :data="extraData"
      :before-upload="onBeforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        {{ t('uploadFileModalTips1') }}
        <em>{{ t('uploadFileModalTips2') }}</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">{{ t('uploadFileModalTips3') }}</div>
      </template>
    </el-upload>
  </AppBasicModal>
</template>
