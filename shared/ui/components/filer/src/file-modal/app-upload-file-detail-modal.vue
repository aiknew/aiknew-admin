<script setup lang="tsx">
import { computed, h, nextTick, ref, useTemplateRef } from 'vue'
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { useFileType } from '../composables'
import type {
  IUpdateUploadFile,
  IUploadFileGroup,
  IUploadFile,
} from '@aiknew/shared-types'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { filesize } from 'filesize'
import { useFileI18n } from '../composables/use-file-i18n'
import { AppForm, Field, makeFields } from '@aiknew/shared-ui-form'
import z from 'zod'

export type FileItemWithGroupName = IUploadFile & { groupName: string }

export interface Emits {
  (e: 'submit'): void
}

export interface Props {
  defaultExpandedTreeNodeKeys: string[]
  loadGroupTreeNode: (
    node: Node,
    resolve: (
      data: Omit<IUploadFileGroup, 'updatedAt' | 'createdAt'>[],
    ) => void,
    reject: () => void,
  ) => void
  updateFile: (data: {
    id: string
    body: IUpdateUploadFile
  }) => Promise<unknown>
}

const emit = defineEmits<Emits>()
const { updateFile, defaultExpandedTreeNodeKeys, loadGroupTreeNode } =
  defineProps<Props>()

const { t } = useFileI18n()
const modalRef = useTemplateRef<InstanceType<typeof AppBasicModal>>('modal')
const appFormRef = useTemplateRef('appForm')
const { isImage, isVideo, isPreviewable } = useFileType()
const showFooter = ref(false)
const fileDetail = ref<FileItemWithGroupName>()

const isEditMode = computed(() => modalRef.value?.modalMode === 'edit')
const editFileId = computed(() => {
  return fileDetail.value?.id ?? ''
})

const TextItem = ({ text }: { text?: string }) => {
  return <span class="detail-item">{text}</span>
}

const channelText = (channel?: number) => {
  switch (channel) {
    case 10:
      return 'Admin'
    default:
      return ''
  }
}

const previewField: Field<string> = {
  as: 'ElFormItem',
  label: 'preview',
  name: 'preview',
  formItemSlots: {
    default() {
      const fileOriginalName = fileDetail.value?.originalName
      const filePath = fileDetail.value?.filePath

      if (fileOriginalName && filePath && isPreviewable(fileOriginalName)) {
        if (isImage(fileOriginalName)) {
          return [
            h('img', {
              class: ['preview'],
              alt: 'preview',
              src: '/' + filePath,
            }),
          ]
        }

        if (isVideo(fileOriginalName)) {
          return [
            h('video', {
              class: ['preview'],
              alt: 'preview',
              controls: true,
              src: '/' + filePath,
            }),
          ]
        }
      }

      return [h('div', '')]
    },
  },
}

const editFields = makeFields(
  previewField,
  {
    as: 'ElInput',
    label: 'fileName',
    name: 'originalName',
    attrs: {
      placeholder: 'enterFileName',
    },
  },
  {
    as: 'ElTreeSelect',
    label: 'fileGroup',
    name: 'groupId',
    rules: z.string().default('0'),
    attrs: {
      valueKey: 'id',
      nodeKey: 'id',
      lazy: true,
      checkStrictly: true,
      defaultExpandedKeys: defaultExpandedTreeNodeKeys,
      props: {
        label: 'groupName',
      },
      load: loadGroupTreeNode,
    },
  },
  {
    as: 'ElInputNumber',
    label: 'order',
    name: 'order',
    formItemSlots: {
      default() {
        return [h('div', { class: ['w-full'] }, t('orderTips'))]
      },
    },
    rules: z.number().default(10),
  },
)

const detailFields = makeFields(
  previewField,

  {
    as: 'ElFormItem',
    label: 'fileId',
    name: 'fileId',
    formItemSlots: {
      default() {
        return [h(TextItem, { text: fileDetail.value?.id })]
      },
    },
  },

  {
    as: 'ElFormItem',
    label: 'fileName',
    name: 'fileNameDetail',
    formItemSlots: {
      default() {
        return [h(TextItem, { text: fileDetail.value?.originalName })]
      },
    },
  },

  {
    as: 'ElFormItem',
    label: 'fileSize',
    name: 'fileSize',
    formItemSlots: {
      default() {
        const size = fileDetail.value?.fileSize
        if (size) {
          return [h(TextItem, { text: filesize(size) })]
        }

        return [h('div')]
      },
    },
  },

  {
    as: 'ElFormItem',
    label: 'fileGroup',
    name: 'fileGroup',
    formItemSlots: {
      default() {
        return [h(TextItem, { text: fileDetail.value?.groupName })]
      },
    },
  },

  {
    as: 'ElFormItem',
    label: 'from',
    name: 'from',
    formItemSlots: {
      default() {
        return [h(TextItem, { text: channelText(fileDetail.value?.channel) })]
      },
    },
  },

  {
    as: 'ElFormItem',
    label: 'uploader',
    name: 'uploader',
    formItemSlots: {
      default() {
        return [h(TextItem, { text: fileDetail.value?.uploader.userName })]
      },
    },
  },

  {
    as: 'ElFormItem',
    label: 'uploadedAt',
    name: 'uploadedAt',
    formItemSlots: {
      default() {
        return [h(TextItem, { text: String(fileDetail.value?.createdAt) })]
      },
    },
  },

  {
    as: 'ElFormItem',
    label: 'lastUpdatedTime',
    name: 'lastUpdatedTime',
    formItemSlots: {
      default() {
        return [h(TextItem, { text: String(fileDetail.value?.updatedAt) })]
      },
    },
  },
)

const fields = computed(() => {
  if (isEditMode.value) {
    return editFields
  }

  return detailFields
})

const handleSubmit = () => {
  appFormRef.value?.submit().then(async (values) => {
    await updateFile({ id: editFileId.value, body: values })
    handleReset()
    emit('submit')
  })
}

const handleReset = () => {
  appFormRef.value?.reset()
  modalRef.value?.close()
}

const edit = (file: FileItemWithGroupName) => {
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editFileDetailModalTitle'))
  fileDetail.value = file
  showFooter.value = true
  modalRef.value?.show()

  nextTick(() => {
    appFormRef.value?.setFormVals(file)
  })
}

const show = (file: FileItemWithGroupName) => {
  modalRef.value?.setModalMode('show')
  modalRef.value?.setTitle(t('showFileDetailModalTitle'))
  fileDetail.value = file
  showFooter.value = false
  modalRef.value?.show()
}

defineExpose({
  edit,
  show,
})
</script>

<template>
  <AppBasicModal
    append-to-body
    ref="modal"
    :show-footer="showFooter"
    @submit="handleSubmit"
    @close="handleReset"
  >
    <AppForm ref="appForm" :t :fields />
  </AppBasicModal>
</template>

<style>
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
