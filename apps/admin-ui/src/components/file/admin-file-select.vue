<script setup lang="ts">
import { useFileLogic } from '@/composables/use-file-logic'
import type { IUploadFile, IUploadFileQuery } from '@aiknew/shared-types'
import { AppFileSelect } from '@aiknew/shared-ui-components'
import { ref } from 'vue'

interface Props {
  selectLimit?: number
}

const { selectLimit } = defineProps<Props>()

const model = defineModel<IUploadFile[]>({
  default: []
})

const query = ref<IUploadFileQuery>({
  currentPage: 1,
  pageSize: 10,
  keyword: '',
  parentId: '0'
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
</script>

<template>
  <AppFileSelect
    ref="fileManager"
    v-model:selected="model"
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
    @refresh="fetchFilesAndGroups"
  />
</template>
