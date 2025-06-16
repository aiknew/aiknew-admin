<script setup lang="ts">
import { computed, reactive, ref, useTemplateRef } from 'vue'
import {
  type FormInstance,
  ElForm,
  ElFormItem,
  ElInput,
  ElTreeSelect,
  ElInputNumber
} from 'element-plus'
import AppBasicModal from '@/components/common/app-basic-modal.vue'
import { type FileItem, useFileType } from '../composables'
import type { UploadFileGroupDto } from '@/api/upload-file-group'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { filesize } from 'filesize'
import { useUploadFileUpdate, type UpdateUploadFileDto } from '@/api/upload-file'
import { useFileI18n } from '../composables/use-file-i18n'

export type FileItemWithGroupName = FileItem & { groupName: string }

export interface AppUploadFileDetailModalEmits {
  (e: 'submit'): void
}

export interface AppUploadFileDetailModalProps {
  defaultExpandedTreeNodeKeys: string[]
  loadGroupTreeNode: (
    node: Node,
    resolve: (data: Omit<UploadFileGroupDto, 'updatedAt' | 'createdAt'>[]) => void,
    reject: () => void
  ) => void
}

const emit = defineEmits<AppUploadFileDetailModalEmits>()
defineProps<AppUploadFileDetailModalProps>()

const { t } = useFileI18n()
const modalRef = useTemplateRef('modalRef')
const formRef = ref<FormInstance>()
const showFooter = ref(false)
const fileDetail = ref<FileItemWithGroupName>()
const rules = reactive({
  originalName: [
    {
      required: true,
      message: t('enterFileName'),
      trigger: 'blur'
    }
  ],

  groupId: [
    {
      required: true,
      trigger: 'blur'
    }
  ],

  order: [
    {
      required: true,
      trigger: 'blur'
    }
  ]
})
const getDefaultFormData = () => ({
  originalName: '',
  groupID: '0',
  order: 100
})
const formData = ref<UpdateUploadFileDto>(getDefaultFormData())

const isEditMode = computed(() => modalRef.value?.modalMode === 'edit')
const editFileId = computed(() => {
  return fileDetail.value?.id ?? ''
})

const { isImage, isVideo, isPreviewable } = useFileType()
const { mutateAsync: updateFile, error: updateError } = useUploadFileUpdate()

const channelText = (channel: number) => {
  switch (channel) {
    case 10:
      return 'Admin'
  }
}

const handleSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      await updateFile({ id: editFileId.value, body: formData.value })
      if (!updateError.value) {
        handleReset()
        emit('submit')
      }
    }
  })
}

const handleReset = () => {
  formRef?.value?.resetFields()
  formData.value = getDefaultFormData()
  modalRef.value?.close()
}

const edit = (file: FileItemWithGroupName) => {
  modalRef.value?.setModalMode('edit')
  formData.value = { groupId: file?.groupId, order: file?.order, originalName: file?.originalName }
  fileDetail.value = file
  modalRef.value?.show()
  showFooter.value = true
  modalRef.value?.setTitle(t('editFileDetailModalTitle'))
}

const show = (file: FileItemWithGroupName) => {
  modalRef.value?.setModalMode('show')
  fileDetail.value = file
  modalRef.value?.show()
  showFooter.value = false
  modalRef.value?.setTitle(t('showFileDetailModalTitle'))
}

defineExpose({
  edit,
  show
})
</script>

<template>
  <AppBasicModal
    append-to-body
    ref="modalRef"
    :show-footer="showFooter"
    @submit="handleSubmit"
    @close="handleReset"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto">
      <el-form-item :label="t('preview')" v-if="isPreviewable(fileDetail!.originalName)">
        <img
          v-if="isImage(fileDetail!.originalName)"
          class="preview"
          :src="'/' + fileDetail?.filePath"
          :alt="t('preview')"
        />

        <video
          v-if="isVideo(fileDetail!.originalName)"
          class="preview"
          controls
          :src="'/' + fileDetail?.filePath"
        ></video>
      </el-form-item>

      <el-form-item v-if="!isEditMode" :class="{ 'show-item': !isEditMode }" :label="t('fileId')">
        <span class="detail-item">{{ fileDetail!.id }}</span>
      </el-form-item>

      <el-form-item :class="{ 'show-item': !isEditMode }" :label="t('fileName')" prop="name">
        <el-input
          v-if="isEditMode"
          v-model="formData.originalName"
          :placeholder="t('enterFileName')"
        />
        <span class="detail-item" v-else>{{ fileDetail!.originalName }}</span>
      </el-form-item>

      <el-form-item v-if="!isEditMode" :class="{ 'show-item': !isEditMode }" :label="t('fileSize')">
        <span class="detail-item">{{ filesize(fileDetail!.fileSize) }}</span>
      </el-form-item>

      <el-form-item
        :class="{ 'show-item': !isEditMode }"
        :label="t('fileGroup')"
        :required="isEditMode"
      >
        <el-tree-select
          v-if="isEditMode"
          v-model="formData.groupId"
          lazy
          :load="loadGroupTreeNode"
          :default-expanded-keys="defaultExpandedTreeNodeKeys"
          value-key="id"
          :props="{ label: 'groupName' }"
          :check-strictly="true"
        />
        <span class="detail-item" v-else>{{ fileDetail?.groupName }}</span>
      </el-form-item>

      <el-form-item v-if="isEditMode" :label="t('order')" :required="isEditMode">
        <el-input-number v-model="formData.order" controls-position="right" />
        <div class="form-item-tips">{{ t('orderTips') }}</div>
      </el-form-item>

      <el-form-item v-if="!isEditMode" :class="{ 'show-item': !isEditMode }" :label="t('from')">
        <span class="detail-item">{{ channelText(fileDetail!.channel) }}</span>
      </el-form-item>

      <el-form-item v-if="!isEditMode" :class="{ 'show-item': !isEditMode }" :label="t('uploader')">
        <span class="detail-item">{{ fileDetail!.uploader.userName }}</span>
      </el-form-item>

      <el-form-item
        v-if="!isEditMode"
        :class="{ 'show-item': !isEditMode }"
        :label="t('uploadedAt')"
      >
        <span class="detail-item">{{ fileDetail!.createdAt }}</span>
      </el-form-item>

      <el-form-item
        v-if="!isEditMode"
        :class="{ 'show-item': !isEditMode }"
        :label="t('lastUpdatedTime')"
      >
        <span class="detail-item">{{ fileDetail!.updatedAt }}</span>
      </el-form-item>
    </el-form>
  </AppBasicModal>
</template>

<style scoped>
.preview {
  max-width: 100%;
  background: rgba(00, 00, 00, 0.2);
}

.el-form-item.show-item {
  margin-bottom: 2px;
}

.detail-item {
  font-weight: bold;
  word-break: break-word;
}
</style>
