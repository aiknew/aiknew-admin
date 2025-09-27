<script setup lang="ts">
import { h, nextTick, ref, useTemplateRef } from 'vue'
import AppBasicModal from '../../app-basic-modal.vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { AppFormItemTips, type Fields, useAppForm } from '../../app-form'
import type {
  IUploadFileGroup,
  ICreateUploadFileGroup,
} from '@aiknew/shared-types'
import z from 'zod'
import { useI18n } from 'vue-i18n'

export interface Props {
  currentGroupId: string | undefined | null
  defaultExpandedTreeNodeKeys: (string | null)[]
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

const { t } = useI18n()
const modalRef = useTemplateRef('modal')
const currentEditGroupID = ref('')

const { AppForm, formApi } = useAppForm({
  fields: () =>
    [
      {
        as: {
          component: 'ElInput',
          props: {
            placeholder: t('filer.enterGroupName'),
          },
        },
        label: t('filer.fileGroupName'),
        name: 'groupName',
        schema: z.string().nonempty(),
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            placeholder: t('selectParent'),
            clearable: true,
            style: { minWidth: '200px' },
            valueKey: 'id',
            nodeKey: 'id',
            lazy: true,
            checkStrictly: true,
            defaultExpandedKeys: defaultExpandedTreeNodeKeys,
            props: {
              label: (data: IUploadFileGroup) => data.groupName,
            },
            load: loadGroupTreeNode,
          },
        },
        label: t('parent'),
        name: 'parentId',
        schema: z.string().optional().nullable().default(null),
      },
      {
        as: 'ElInputNumber',
        label: t('order'),
        name: 'order',
        schema: z.number().default(10),
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('orderTips') }),
        },
      },
    ] as const satisfies Fields,
  async onSubmit({ values }) {
    if (values.parentId === undefined) {
      values.parentId = null
    }

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
  },
})

const add = () => {
  modalRef.value?.setTitle(t('filer.addFileGroup'))
  modalRef.value?.setModalMode('add')
  modalRef.value?.show()

  nextTick(() => {
    formApi.reset({
      parentId: currentGroupId ?? null,
      order: 10,
      groupName: '',
    })
  })
}

const edit = (data: IUploadFileGroup) => {
  modalRef.value?.setTitle(t('filer.editFileGroup'))
  modalRef.value?.setModalMode('edit')
  modalRef.value?.show()
  currentEditGroupID.value = data.id

  formApi.reset(data, { keepDefaultValues: true })
}

const handleReset = () => {
  modalRef.value?.close()
  formApi.reset()
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
    @submit="formApi.handleSubmit"
    @close="handleReset"
    destroy-on-close
  >
    <AppForm />
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
