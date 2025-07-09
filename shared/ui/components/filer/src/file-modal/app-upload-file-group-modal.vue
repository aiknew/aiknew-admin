<script setup lang="ts">
import { h, nextTick, ref, useTemplateRef } from 'vue'
import { AppBasicModal } from '@aiknew/shared-ui-components'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { AppForm, makeFields } from '@aiknew/shared-ui-form'
import type {
  IUploadFileGroup,
  ICreateUploadFileGroup,
} from '@aiknew/shared-types'
import { useFileI18n } from '../composables/use-file-i18n'
import z from 'zod'

export interface Props {
  currentGroupId: string | undefined
  defaultExpandedTreeNodeKeys: string[]
  loadGroupTreeNode: (
    node: Node,
    resolve: (
      data: Omit<IUploadFileGroup, 'updatedAt' | 'createdAt'>[],
    ) => void,
    reject: () => void,
  ) => void
  createFileGroup: (data: ICreateUploadFileGroup) => Promise<unknown>
  updateFileGroup: (data: {
    id: string
    body: Partial<ICreateUploadFileGroup>
  }) => Promise<unknown>
}

export interface Emits {
  (e: 'create', data: ICreateUploadFileGroup): void
  (
    e: 'update',
    data: {
      id: string
      body: Partial<ICreateUploadFileGroup>
    },
  ): void
  (e: 'submit'): void
  (e: 'close', groupID: string): void
}

const emit = defineEmits<Emits>()
const {
  currentGroupId,
  defaultExpandedTreeNodeKeys,
  loadGroupTreeNode,
  createFileGroup,
  updateFileGroup,
} = defineProps<Props>()

const { t } = useFileI18n()
const appFormRef = useTemplateRef('appForm')
const modalRef = useTemplateRef('modal')
const currentEditGroupID = ref('')

const fields = makeFields(
  {
    as: 'ElInput',
    label: 'fileGroupName',
    name: 'groupName',
    rules: z.string(),
    attrs: {
      placeholder: t('enterGroupName'),
    },
  },
  {
    as: 'ElTreeSelect',
    label: 'parent',
    name: 'parentId',
    rules: z.string().default('0'),
    attrs: {
      valueKey: 'id',
      nodeKey: 'id',
      lazy: true,
      checkStrictly: true,
      defaultExpandedKeys: defaultExpandedTreeNodeKeys,
      props: {
        label: t('groupName'),
      },
      load: loadGroupTreeNode,
    },
  },
  {
    as: 'ElInputNumber',
    label: 'order',
    name: 'order',
    rules: z.number().default(10),
    formItemSlots: {
      default() {
        return [h('div', { class: ['w-full'] }, t('orderTips'))]
      },
    },
  },
)

const handleSubmit = () => {
  appFormRef.value?.submit().then(async (values) => {
    switch (modalRef.value?.modalMode) {
      case 'add':
        await createFileGroup(values)
        break
      case 'edit':
        await updateFileGroup({
          id: currentEditGroupID.value,
          body: values,
        })
        break
    }
    handleReset()
    emit('submit')
  })
}

const add = () => {
  modalRef.value?.setTitle(t('addFileGroup'))
  modalRef.value?.setModalMode('add')
  modalRef.value?.show()

  nextTick(() => {
    appFormRef.value?.setFormVals({
      parentId: currentGroupId ?? '0',
      order: 10,
      groupName: undefined,
    })
  })
}

const edit = (data: IUploadFileGroup) => {
  modalRef.value?.setTitle(t('editFileGroup'))
  modalRef.value?.setModalMode('edit')
  modalRef.value?.show()
  currentEditGroupID.value = data.id

  nextTick(() => {
    appFormRef.value?.setFormVals(data)
  })
}

const handleReset = () => {
  modalRef.value?.close()
  appFormRef.value?.reset()
  emit('close', currentEditGroupID.value)
}

defineExpose({
  add,
  edit,
})
</script>

<template>
  <AppBasicModal
    append-to-body
    ref="modal"
    @submit="handleSubmit"
    @close="handleReset"
    destroy-on-close
  >
    <AppForm ref="appForm" :t :fields />
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
