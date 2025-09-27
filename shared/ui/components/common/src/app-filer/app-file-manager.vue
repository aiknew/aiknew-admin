<script setup lang="ts">
import { ElSpace } from 'element-plus'
import { useFileManager } from './composables/use-file-manager'
import { execute } from '@aiknew/shared-utils'
import type {
  IUploadFileQuery,
  IUploadFile,
  IUploadFileGroup,
  IUploadFilesAndGroupsData,
  ICreateUploadFileGroup,
  IUpdateUploadFile,
} from '@aiknew/shared-types'
import { computed, onMounted, ref, type Ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { FileStatus } from '@aiknew/shared-enums'
import type { PermissionOpts, Storages } from './types'
import { useDebounceFn } from '@vueuse/core'

export interface Props extends PermissionOpts {
  selectLimit?: number
  filesAndGroupsData: IUploadFilesAndGroupsData | undefined
  storages: Storages
  deleteSelected: (selectedFiles: IUploadFile[]) => Promise<unknown>
  createFileGroup: (data: ICreateUploadFileGroup) => Promise<unknown>
  updateFileGroup: (data: {
    id: string
    body: Partial<ICreateUploadFileGroup>
  }) => Promise<unknown>
  loadGroupNode: (
    currentEditGroupId: Ref<string | undefined>,
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
  deleteFile: (item: IUploadFile) => void
  deleteGroup: (item: IUploadFileGroup) => void
  beforeUpload?: (extraFormData: Ref<Record<string, unknown>>) => void
}

export interface Emits {
  (e: 'delete-file', item: IUploadFile): void
  (e: 'refresh'): void
}

const queryModel = defineModel<IUploadFileQuery>('query', {
  default: {
    currentPage: 1,
    keyword: '',
    pageSize: 10,
    parentId: null,
  },
})

const {
  storages,
  filesAndGroupsData,
  deleteSelected,
  deleteFile,
  loadGroupNode,
  updateFile,
  beforeUpload,
  selectLimit,

  /**
   * permissions
   */
  showAddGroup = true,
  showDeleteFile = true,
  showDeleteGroup = true,
  showEditFile = true,
  showEditGroup = true,
  showUploadFile = true,
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
  currentEditGroupId,
  currentGroupPathIds,
  currentGroupPath,
  filesAndGroups,
  selectedCount,
  total,
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
} = useFileManager(
  computed(() => filesAndGroupsData ?? { ...defaultData }),
  queryModel,
)

const loadGroupTreeNode = (
  node: Node,
  resolve: (data: Omit<IUploadFileGroup, 'updatedAt' | 'createdAt'>[]) => void,
  reject: () => void,
) => {
  loadGroupNode(currentEditGroupId, node, resolve, reject)
}

const searchKeyword = ref(queryModel.value.keyword)
const updateQueryKeyword = useDebounceFn((keyword: string) => {
  queryModel.value.keyword = keyword
}, 200)

const handleUpdateKeyword = (keyword: string) => {
  searchKeyword.value = keyword
  updateQueryKeyword(keyword)
}

onMounted(() => {
  emit('refresh')
})

defineExpose({
  selectedFiles,
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
        v-model:search-scope="searchScope"
        :current-group-id="queryModel.parentId"
        :selected-count="selectedCount"
        :search-keyword
        :show-add-group
        :show-delete-file
        :show-upload-file
        @update:search-keyword="handleUpdateKeyword"
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
      />
    </el-space>
  </div>

  <AppFileListContainer
    ref="appFileListContainer"
    v-model:currentPage="queryModel.currentPage"
    v-model:pageSize="queryModel.pageSize"
    :select-limit
    :files-and-groups
    :total="total"
    :current-group-path
    :show-delete-file
    :show-delete-group
    :show-edit-file
    :show-edit-group
    @delete-group="execute(deleteGroup.bind(null, $event), refresh)"
    @delete-file="execute(deleteFile.bind(null, $event), refresh)"
    @edit-group="handleEditGroup"
    @click-group="execute(handleClickGroup.bind(null, $event))"
    @click-file="handleClickFile"
    @edit-file="handleEditFIle"
    @select="handleSelectFile"
    @back-to-previous-group="execute(backToGroup)"
    @back-to-upper-group="execute(backToUpper)"
    @forward-to-next-group="execute(forwardToGroup)"
    @refresh="refresh"
  />

  <!-- Modals -->
  <AppUploadFileModal
    :storages
    :before-upload
    ref="appUploadFileModal"
    :current-group-id="queryModel.parentId"
    @close="refresh"
  />
  <AppUploadFileGroupModal
    ref="appUploadFileGroupModal"
    :current-group-id="queryModel.parentId"
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
