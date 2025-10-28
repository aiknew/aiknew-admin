<script setup lang="tsx">
import { computed, h, ref, useTemplateRef } from "vue"
import AppBasicModal from "../../app-basic-modal.vue"
import { useFileType } from "../composables"
import type {
  IUpdateUploadFile,
  IUploadFileGroup,
  IUploadFile,
} from "@aiknew/shared-types"
import type Node from "element-plus/es/components/tree/src/model/node"
import { filesize } from "filesize"
import { AppFormItemTips, type Fields, useAppForm } from "../../app-form"
import z from "zod"
import { ElLink } from "element-plus"
import AppFileStorageDetailModal from "./app-file-storage-detail-modal.vue"
import { useI18n } from "vue-i18n"

export type FileItemWithGroupName = IUploadFile & { groupName: string }

export interface Emits {
  (e: "submit"): void
}

export interface Props {
  defaultExpandedTreeNodeKeys: (string | null)[]
  loadGroupTreeNode: (
    node: Node,
    resolve: (
      data: Omit<IUploadFileGroup, "updatedAt" | "createdAt">[],
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

const { t } = useI18n()
const modalRef = useTemplateRef<InstanceType<typeof AppBasicModal>>("modal")
const storageModalRef = useTemplateRef("storageModal")
const { isImage, isVideo, isPreviewable } = useFileType()
const showFooter = ref(false)
const fileDetail = ref<FileItemWithGroupName>()

const isEditMode = computed(() => modalRef.value?.modalMode === "edit")
const editFileId = computed(() => {
  return fileDetail.value?.id ?? ""
})

const TextItem = ({ text }: { text?: string }) => {
  return <span class="detail-item">{text}</span>
}

const previewField = () =>
  ({
    exclude: true,
    label: t("filer.preview"),
    container: {
      content() {
        const fileOriginalName = fileDetail.value?.originalName
        const filePath = fileDetail.value?.filePath

        if (fileOriginalName && filePath && isPreviewable(fileOriginalName)) {
          if (isImage(fileOriginalName)) {
            return [
              h("img", {
                class: ["preview"],
                alt: "preview",
                src: filePath,
              }),
            ]
          }

          if (isVideo(fileOriginalName)) {
            return [
              h("video", {
                class: ["preview"],
                alt: "preview",
                controls: true,
                src: filePath,
              }),
            ]
          }
        }

        return [h("div", "")]
      },
    },
  }) as const

const editFields = () =>
  [
    previewField(),
    {
      as: {
        component: "ElInput",
        props: {
          placeholder: "enterFileName",
        },
      },
      label: t("filer.fileName"),
      name: "originalName",
      schema: z.string().default(""),
    },
    {
      as: {
        component: "ElTreeSelect",
        props: {
          placeholder: t("selectParent"),
          clearable: true,
          style: { minWidth: "200px" },
          valueKey: "id",
          nodeKey: "id",
          lazy: true,
          checkStrictly: true,
          defaultExpandedKeys: defaultExpandedTreeNodeKeys,
          props: {
            label: "groupName",
          },
          load: loadGroupTreeNode,
        },
      },
      label: t("filer.fileGroup"),
      name: "groupId",
      schema: z.string().optional().nullable().default(null),
    },
    {
      as: "ElInputNumber",
      label: t("order"),
      name: "order",
      container: {
        bottomSlot() {
          return [h(AppFormItemTips, { text: t("orderTips") })]
        },
      },
      schema: z.number().default(10),
    },
  ] as const satisfies Fields

const detailFields = () =>
  [
    previewField(),

    {
      exclude: true,
      label: t("filer.fileId"),
      container: {
        content() {
          return h(TextItem, { text: fileDetail.value?.id })
        },
      },
    },

    {
      exclude: true,
      label: t("filer.fileName"),
      container: {
        content() {
          return h(TextItem, { text: fileDetail.value?.originalName })
        },
      },
    },

    {
      exclude: true,
      label: t("filer.fileStatus"),
      container: {
        content() {
          return h(TextItem, { text: fileDetail.value?.status })
        },
      },
    },

    {
      exclude: true,
      label: t("filer.storageName"),
      container: {
        content() {
          return h(
            ElLink,
            {
              type: "primary",
              onClick() {
                storageModalRef.value?.show(fileDetail.value?.storage)
              },
            },
            () => fileDetail.value?.storage.name,
          )
        },
      },
    },

    {
      exclude: true,
      label: t("filer.fileSize"),
      container: {
        content() {
          const size = fileDetail.value?.fileSize
          if (size) {
            return h(TextItem, { text: filesize(size) })
          }
        },
      },
    },

    {
      exclude: true,
      label: t("filer.fileGroup"),
      container: {
        content() {
          return h(TextItem, { text: fileDetail.value?.groupName })
        },
      },
    },

    {
      exclude: true,
      label: t("filer.from"),
      container: {
        content() {
          return h(TextItem, { text: fileDetail.value?.channel })
        },
      },
    },

    {
      exclude: true,
      label: t("filer.uploader"),
      container: {
        content() {
          return h(TextItem, { text: fileDetail.value?.uploader.userName })
        },
      },
    },

    {
      exclude: true,
      label: t("filer.uploadedAt"),
      container: {
        content() {
          return h(TextItem, { text: String(fileDetail.value?.createdAt) })
        },
      },
    },

    {
      exclude: true,
      label: t("filer.lastUpdatedTime"),
      container: {
        content() {
          return h(TextItem, { text: String(fileDetail.value?.updatedAt) })
        },
      },
    },
  ] as const satisfies Fields

const fields = computed(() => {
  if (isEditMode.value) {
    return editFields()
  }

  return detailFields()
})

const { AppForm, formApi } = useAppForm({
  fields: () => fields.value,
  async onSubmit({ values }) {
    if (values.groupId === undefined) {
      values.groupId = null
    }

    await updateFile({ id: editFileId.value, body: values })
    handleReset()
    emit("submit")
  },
})

const handleReset = () => {
  formApi.reset()
  modalRef.value?.close()
}

const edit = (file: FileItemWithGroupName) => {
  modalRef.value?.setModalMode("edit")
  modalRef.value?.setTitle(t("filer.editFileDetailModalTitle"))
  fileDetail.value = file
  showFooter.value = true
  modalRef.value?.show()

  formApi.reset(file, { keepDefaultValues: true })
}

const show = (file: FileItemWithGroupName) => {
  modalRef.value?.setModalMode("show")
  modalRef.value?.setTitle(t("filer.showFileDetailModalTitle"))
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
    @submit="formApi.handleSubmit"
    @close="handleReset"
  >
    <AppForm />
  </AppBasicModal>

  <AppFileStorageDetailModal ref="storageModal" />
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
