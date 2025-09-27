<script setup lang="ts">
import { useFileLogic } from '@/composables/use-file-logic'
import { useUserStore } from '@/stores'
import type { IUploadFile, IUploadFileQuery } from '@aiknew/shared-types'
import { AppFileModal } from '@aiknew/shared-ui-components'
import { ref, useTemplateRef } from 'vue'

interface Props {
  selectLimit?: number
}

interface Emits {
  (e: 'submit', files: IUploadFile[]): void
}

const { selectLimit } = defineProps<Props>()
const emit = defineEmits<Emits>()
const { checkPermission } = useUserStore()
const fileModalRef = useTemplateRef('fileModal')
const authRoutePath = '/content/file'

const query = ref<IUploadFileQuery>({
  currentPage: 1,
  pageSize: 10,
  keyword: '',
  parentId: null
})

const {
  beforeUpload,
  createFileGroup,
  deleteFile,
  deleteGroup,
  deleteSelected,
  fetchFilesAndGroups,
  filesAndGroupsData,
  loadGroupNode,
  storages,
  updateFile,
  updateFileGroup
} = useFileLogic(query)

const show = () => {
  fileModalRef.value?.show()
}

const handleSubmit = (files: IUploadFile[]) => {
  emit('submit', files)
}

defineExpose({
  show
})
</script>

<template>
  <AppFileModal
    ref="fileModal"
    v-model:query="query"
    :select-limit
    :storages
    :before-upload
    :delete-group
    :delete-file
    :files-and-groups-data
    :delete-selected
    :create-file-group
    :update-file-group
    :load-group-node
    :update-file
    :show-add-group="checkPermission('add-group', authRoutePath)"
    :show-edit-file="checkPermission('edit-file', authRoutePath)"
    :show-edit-group="checkPermission('edit-group', authRoutePath)"
    :show-delete-file="checkPermission('delete-file', authRoutePath)"
    :show-delete-group="checkPermission('delete-group', authRoutePath)"
    :show-upload-file="checkPermission('upload-file', authRoutePath)"
    @refresh="fetchFilesAndGroups"
    @submit="handleSubmit"
  />
</template>
