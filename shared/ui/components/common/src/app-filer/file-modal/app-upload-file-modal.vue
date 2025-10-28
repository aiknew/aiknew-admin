<script setup lang="ts">
import { type Ref, ref, useTemplateRef, watchEffect } from "vue"
import AppBasicModal from "../../app-basic-modal.vue"
import {
  ElMessage,
  ElUpload,
  ElIcon,
  ElSelectV2,
  ElFormItem,
} from "element-plus"
import type { Storages } from "../types"
import { isPromise } from "element-plus/es/utils/types.mjs"
import { useI18n } from "vue-i18n"

export interface Props {
  currentGroupId: string | undefined | null
  storages: Storages
  beforeUpload?: (extraFormData: Ref<Record<string, unknown>>) => void
}

export interface Emits {
  (e: "close"): void
}

defineEmits<Emits>()
const { currentGroupId, storages, beforeUpload } = defineProps<Props>()
const { t } = useI18n()
const modalRef = useTemplateRef("modal")
const extraData = ref<Record<string, unknown>>({})
const uploadHeaders = ref<Record<string, unknown>>({})
const uploadURL = ref<string | undefined>()
const selectedStorageId = ref<string | undefined>(undefined)
const isLoading = ref(false)

const updateURL = async (storageId: string | undefined) => {
  const storage = storages.find((item) => item.id === storageId)
  const url = storage?.uploadURL

  if (typeof url === "function") {
    const ret = url(extraData, uploadHeaders, {
      currentGroupId,
      selectedStorageId: selectedStorageId.value,
    })
    uploadURL.value = isPromise(ret) ? await ret : ret
  } else {
    uploadURL.value = url
  }
}

watchEffect(async () => {
  isLoading.value = true
  await updateURL(selectedStorageId.value)
  isLoading.value = false
})

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
    if (typeof o === "object" && typeof o.msg === "string") {
      message = o.msg
    }
  } catch {}

  ElMessage.error({
    message,
  })
}

const show = () => {
  modalRef.value?.setTitle(t("filer.uploadFileModalTitle"))
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
    <el-form-item :label="t('filer.selectStorage')">
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
        {{ t("filer.uploadFileModalTips1") }}
        <em>{{ t("filer.uploadFileModalTips2") }}</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">{{ t("filer.uploadFileModalTips3") }}</div>
      </template>
    </el-upload>
  </AppBasicModal>
</template>
