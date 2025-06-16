<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useUserStore } from '@/stores/user'
import { useLangStore } from '@/stores/lang'
import AppBasicModal from '@/components/common/app-basic-modal.vue'
import { ElMessage, ElUpload, ElIcon } from 'element-plus'
import { uploadFileUrl } from '@/api/upload-file'
import { useFileI18n } from '../composables/use-file-i18n'

export interface UploadFileModalProps {
  currentGroupId: string
}

export interface UploadFileModalEmits {
  (e: 'close'): void
}

defineEmits<UploadFileModalEmits>()
const { currentGroupId } = defineProps<UploadFileModalProps>()
const { t } = useFileI18n()

const userStore = useUserStore()
const langStore = useLangStore()
const modalRef = useTemplateRef('modalRef')
const uploadHeaders = ref({})
const extraData = ref({})
const actionUrl = import.meta.env.VITE_API_BASE_URL + uploadFileUrl

const onBeforeUpload = () => {
  extraData.value = {
    groupId: currentGroupId
  }

  uploadHeaders.value = {
    Authorization: `Bearer ${userStore.accessToken}`,
    'x-lang': langStore.currentLang
  }
}

const onSuccess = (response: { msg: string }) => {
  ElMessage.success({
    message: response.msg
  })
}

const onError = (err: Error) => {
  ElMessage.error({
    message: JSON.parse(err.message).msg
  })
}

const show = () => {
  modalRef.value?.setTitle(t('uploadFileModalTitle'))
  modalRef.value?.show()
}

defineExpose({
  show
})
</script>

<template>
  <AppBasicModal append-to-body ref="modalRef" :show-footer="false" @close="$emit('close')">
    <el-upload
      drag
      multiple
      :action="actionUrl"
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

<style scoped></style>
