<script setup lang="ts">
import { ElSpace } from 'element-plus'
import { useFileManager } from './composables/use-file-manager'
import { execute } from '@aiknew/shared-utils'
import {
  IUploadFileQuery,
  IUploadFile,
  IUploadFileGroup,
  IUploadFilesAndGroupsData,
} from '@aiknew/shared-types'
import { computed, onMounted, Ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { SharedProps } from './types/props'
import { FileStatus } from '@aiknew/shared-enums'

export interface Props extends SharedProps {
  filesAndGroupsData: IUploadFilesAndGroupsData | undefined
  deleteFile: (item: IUploadFile) => void
  deleteGroup: (item: IUploadFileGroup) => void
  beforeUpload?: (extraFormData: Ref<Record<string, unknown>>) => void
}

export interface Emits {
  (e: 'delete-file', item: IUploadFile): void
  (e: 'refresh'): void
}

const {
  storages: storage,
  filesAndGroupsData,
  deleteSelected,
  deleteFile,
  loadGroupNode,
  updateFile,
  beforeUpload,
} = defineProps<Props>()
const emit = defineEmits<Emits>()

const defaultData: IUploadFilesAndGroupsData = {
  current: 1,
  fileList: [],
  groupList: [],
  pageSize: 10,
  total: 0,
}

const refresh = () => {
  emit('refresh')
}

const {
  // vars
  currentGroupId,
  currentEditGroupId,
  currentGroupPathIds,
  currentGroupPath,
  filesAndGroups,
  selectedCount,
  currentPage,
  pageSize,
  total,
  searchKeyword,
  searchScope,
  selectedFiles,

  // methods
  backToGroup,
  backToUpper,
  forwardToGroup,
  handleUpload,
  handleEditFIle,
  handleClickFile,
  handleAddGroup,
  handleEditGroup,
  handleClickGroup,
  handleJumpToGroup,
  handleSelectFile,
  handleClearSelected,

  // components
  AppFileListContainer,
  AppFileOperations,
  AppFileGroupPath,
  AppUploadFileModal,
  AppUploadFileGroupModal,
  AppUploadFileDetailModal,
} = useFileManager(computed(() => filesAndGroupsData ?? { ...defaultData }))

const loadGroupTreeNode = (
  node: Node,
  resolve: (data: Omit<IUploadFileGroup, 'updatedAt' | 'createdAt'>[]) => void,
  reject: () => void,
) => {
  loadGroupNode(currentEditGroupId, node, resolve, reject)
}

onMounted(() => {
  emit('refresh')
})

defineExpose({
  selectedFiles,
  query: computed<IUploadFileQuery>(() => {
    return {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value,
      parentId: currentGroupId.value,
    }
  }),
  clearSelected: handleClearSelected,
})
</script>

<template>
  <div class="header">
    <el-space
      direction="vertical"
      size="large"
      alignment="normal"
      :style="{ width: '100%' }"
    >
      <AppFileGroupPath
        :group-path="currentGroupPath"
        :search-scope
        @jump="handleJumpToGroup"
      />
      <AppFileOperations
        v-model:search-keyword="searchKeyword"
        v-model:search-scope="searchScope"
        :current-group-id
        :selected-count="selectedCount"
        @upload="handleUpload"
        @add-group="handleAddGroup"
        @clear-selected="handleClearSelected"
        @delete-selected="
          execute(
            deleteSelected.bind(null, selectedFiles),
            handleClearSelected,
            refresh,
          )
        "
        @search="refresh"
      />
    </el-space>
  </div>

  <AppFileListContainer
    ref="appFileListContainer"
    :files-and-groups
    v-model:currentPage="currentPage"
    v-model:pageSize="pageSize"
    :total="total"
    :current-group-path
    @delete-group="execute(deleteGroup.bind(null, $event), refresh)"
    @delete-file="execute(deleteFile.bind(null, $event), refresh)"
    @edit-group="handleEditGroup"
    @click-group="execute(handleClickGroup.bind(null, $event), refresh)"
    @click-file="handleClickFile"
    @edit-file="handleEditFIle"
    @select="handleSelectFile"
    @back-to-previous-group="execute(backToGroup, refresh)"
    @back-to-upper-group="execute(backToUpper, refresh)"
    @forward-to-next-group="execute(forwardToGroup, refresh)"
    @refresh="refresh"
  />

  <!-- Modals -->
  <AppUploadFileModal
    :storages
    :before-upload
    ref="appUploadFileModal"
    :current-group-id
    @close="refresh"
  />
  <AppUploadFileGroupModal
    ref="appUploadFileGroupModal"
    :current-group-id
    :default-expanded-tree-node-keys="currentGroupPathIds"
    :create-file-group
    :update-file-group
    :load-group-tree-node
    @close="currentEditGroupId = undefined"
    @submit="refresh"
  />
  <AppUploadFileDetailModal
    :update-file
    ref="fileDetailModal"
    :default-expanded-tree-node-keys="currentGroupPathIds"
    :load-group-tree-node
    @submit="refresh"
  />
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  margin-bottom: 20px;
}
</style>
