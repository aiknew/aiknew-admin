<script setup lang="ts">
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { AppFileManager } from '@aiknew/shared-ui-components'
import { ref } from 'vue'
import { useFileLogic } from '@/composables/use-file-logic'
import type { IUploadFileQuery } from '@aiknew/shared-types'

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
  <AppContentBlock>
    <AppFileManager
      ref="fileManager"
      v-model:query="query"
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
  </AppContentBlock>
</template>
