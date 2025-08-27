<script setup lang="ts">
import { computed, Ref, ref, useTemplateRef, watch } from 'vue'
import { AppBasicModal } from '@aiknew/shared-ui-components'
import {
  ElMessage,
  ElUpload,
  ElIcon,
  ElSelectV2,
  ElFormItem,
} from 'element-plus'
import { useFileI18n } from '../composables/use-file-i18n'
import { SharedProps, UploadStorage } from '@/types'
import { isPromise } from 'element-plus/es/utils/types.mjs'

export interface Props {
  currentGroupId: string | undefined
  storages: SharedProps['storages']
  beforeUpload?: (extraFormData: Ref<Record<string, unknown>>) => void
}

export interface Emits {
  (e: 'close'): void
}

defineEmits<Emits>()
const { currentGroupId, storages, beforeUpload } = defineProps<Props>()
const { t } = useFileI18n()
const modalRef = useTemplateRef('modal')
const extraData = ref<Record<string, unknown>>({})
const uploadHeaders = ref<Record<string, unknown>>({})
const uploadURL = ref<string | undefined>()
const selectedStorageId = ref<string | undefined>(undefined)
const isLoading = ref(false)

watch(
  selectedStorageId,
  async (storageId) => {
    isLoading.value = true
    const storage = storages.find((item) => item.id === storageId)
    const url = storage?.uploadURL

    if (typeof url === 'function') {
      const ret = url(extraData, uploadHeaders, {
        currentGroupId,
        selectedStorageId: selectedStorageId.value,
      })
      uploadURL.value = isPromise(ret) ? await ret : ret
    } else {
      uploadURL.value = url
    }

    isLoading.value = false
  },
  { immediate: true },
)

const onBeforeUpload = () => {
  return beforeUpload && beforeUpload(extraData)
}

const onSuccess = (response: { msg: string }) => {
  ElMessage.success({
    message: response.msg,
  })
}

const onError = (err: { message: string }) => {
  let message = String(err)
  if (err.message) {
    message = err.message
  }

  try {
    const o = JSON.parse(err.message)
    if (typeof o === 'object' && typeof o.msg === 'string') {
      message = o.msg
    }
  } catch {}

  ElMessage.error({
    message,
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
    <el-form-item :label="t('selectStorage')">
      <el-select-v2
        v-model="selectedStorageId"
        :options="storages"
        :props="{ value: 'id', label: 'name' }"
      ></el-select-v2>
    </el-form-item>
    <el-upload
      v-loading="isLoading"
      drag
      multiple
      :disabled="!Boolean(selectedStorageId)"
      :action="uploadURL"
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
