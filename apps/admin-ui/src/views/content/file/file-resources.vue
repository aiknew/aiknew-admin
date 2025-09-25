<script setup lang="ts">
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { AppFileManager } from '@aiknew/shared-ui-components'
import { ref } from 'vue'
import { useFileLogic } from '@/composables/use-file-logic'
import type { IUploadFileQuery } from '@aiknew/shared-types'
import { useUserStore } from '@/stores'

const query = ref<IUploadFileQuery>({
  currentPage: 1,
  pageSize: 10,
  keyword: '',
  parentId: '0'
})

const authRoutePath = '/content/file'
const { checkPermission } = useUserStore()

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
      :show-add-group="checkPermission('add-group', authRoutePath)"
      :show-edit-file="checkPermission('edit-file', authRoutePath)"
      :show-edit-group="checkPermission('edit-group', authRoutePath)"
      :show-delete-file="checkPermission('delete-file', authRoutePath)"
      :show-delete-group="checkPermission('delete-group', authRoutePath)"
      :show-upload-file="checkPermission('upload-file', authRoutePath)"
      @refresh="fetchFilesAndGroups"
    />
  </AppContentBlock>
</template>
