<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'
import AppBasicModal, { type ModalMode } from '@/components/common/app-basic-modal.vue'
import {
  type FormInstance,
  ElForm,
  ElFormItem,
  ElInput,
  ElTreeSelect,
  ElInputNumber
} from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { GroupItem } from '../composables'
import {
  useUploadFileGroupCreate,
  useUploadFileGroupUpdate,
  type CreateUploadFileGroupDto,
  type UploadFileGroupDto
} from '@/api/upload-file-group'
import { useFileI18n } from '../composables/use-file-i18n'

export interface AppUploadFileGroupModalProps {
  currentGroupId: string
  defaultExpandedTreeNodeKeys: string[]
  loadGroupTreeNode: (
    node: Node,
    resolve: (data: Omit<UploadFileGroupDto, 'updatedAt' | 'createdAt'>[]) => void,
    reject: () => void
  ) => void
}

export interface AppUploadFileGroupEmits {
  (e: 'submit'): void
  (e: 'close', groupID: string): void
}

const emit = defineEmits<AppUploadFileGroupEmits>()
const { currentGroupId, defaultExpandedTreeNodeKeys } = defineProps<AppUploadFileGroupModalProps>()

const { t } = useFileI18n()
const formRef = ref<FormInstance>()
const modalRef = useTemplateRef('modalRef')
const rules = reactive({
  groupName: [
    {
      required: true,
      message: t('enterGroupName'),
      trigger: 'blur'
    }
  ],

  parentId: [
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
  groupName: '',
  parentId: '0',
  order: 100
})
const formData = ref<CreateUploadFileGroupDto>(getDefaultFormData())
const currentEditGroupID = ref('')
const { mutateAsync: createFileGroup, error: createError } = useUploadFileGroupCreate()
const { mutateAsync: updateFileGroup, error: updateError } = useUploadFileGroupUpdate()

const handleSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      switch (modalRef.value?.modalMode) {
        case 'add':
          await createFileGroup(formData.value)
          break
        case 'edit':
          await updateFileGroup({ id: currentEditGroupID.value, body: formData.value })
          break
      }

      if (!createError.value && !updateError.value) {
        handleReset()
        emit('submit')
      }
    }
  })
}

const add = () => {
  modalRef.value?.setTitle(t('addFileGroup'))
  modalRef.value?.setModalMode('add')
  modalRef.value?.show()
  formData.value = {
    ...getDefaultFormData(),
    parentId: currentGroupId
  }
}

const edit = (data: GroupItem) => {
  modalRef.value?.setTitle(t('editFileGroup'))
  modalRef.value?.setModalMode('edit')
  formData.value = {
    groupName: data.groupName,
    order: data.order,
    parentId: currentGroupId
  }
  modalRef.value?.show()
  currentEditGroupID.value = data.id
}

const handleReset = () => {
  modalRef.value?.close()
  formRef.value?.resetFields()
  formData.value = getDefaultFormData()
  emit('close', currentEditGroupID.value)
}

defineExpose({
  add,
  edit
})
</script>

<template>
  <AppBasicModal
    append-to-body
    ref="modalRef"
    @submit="handleSubmit"
    @close="handleReset"
    destroy-on-close
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto">
      <el-form-item :label="t('fileGroupName')" prop="name">
        <el-input v-model="formData.groupName" :placeholder="t('enterGroupName')" />
      </el-form-item>

      <el-form-item :label="t('parent')" required>
        <el-tree-select
          v-model="formData.parentId"
          :check-strictly="true"
          :load="loadGroupTreeNode"
          lazy
          :render-after-expand="false"
          :default-expanded-keys="defaultExpandedTreeNodeKeys"
          value-key="id"
          :props="{ label: 'groupName' }"
        />
      </el-form-item>
      <el-form-item :label="t('order')" required>
        <el-input-number v-model="formData.order" controls-position="right" />
        <div class="form-item-tips">{{ t('orderTips') }}</div>
      </el-form-item>
    </el-form>
  </AppBasicModal>
</template>

<style lang="scss" scoped>
.form-item {
  display: flex;

  &-label {
    display: flex;
    padding: 0 12px 0 7px;
  }

  &-content {
    display: flex;
    flex: 1;

    .el-tree {
      width: 100%;
    }
  }
}
</style>
