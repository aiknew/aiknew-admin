<script setup lang="ts">
import { ElSpace } from 'element-plus'
import { useFile } from './composables/use-file'

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
  loadGroupTreeNode,
  handleUpload,
  handleDeleteFile,
  handleEditFIle,
  handleClickFile,
  handleAddGroup,
  handleEditGroup,
  handleDeleteGroup,
  handleClickGroup,
  handleJumpToGroup,
  handleChangeGroup,
  handleSelectFile,
  handleDeleteSelected,
  handleSearch,
  handleClearSelected,
  getData,

  // components
  AppFileListContainer,
  AppFileOperations,
  AppUploadFileModal,
  AppUploadFileGroupModal,
  AppFileGroupPath,
  AppUploadFileDetailModal
} = useFile()

defineExpose({
  selectedFiles,
  clearSelected: handleClearSelected
})
</script>

<template>
  <div class="header">
    <el-space direction="vertical" size="large" alignment="normal" :style="{ width: '100%' }">
      <AppFileGroupPath :group-path="currentGroupPath" :search-scope @jump="handleJumpToGroup" />
      <AppFileOperations
        v-model:search-keyword="searchKeyword"
        v-model:search-scope="searchScope"
        :selected-count="selectedCount"
        @upload="handleUpload"
        @add-group="handleAddGroup"
        @clear-selected="handleClearSelected"
        @delete-selected="handleDeleteSelected"
        @search="handleSearch"
      />
    </el-space>
  </div>

  <AppFileListContainer
    ref="appFileListContainerRef"
    :files-and-groups
    v-model:currentPage="currentPage"
    v-model:pageSize="pageSize"
    :total="total"
    :current-group-path
    @delete-group="handleDeleteGroup"
    @delete-file="handleDeleteFile"
    @edit-group="handleEditGroup"
    @click-group="handleClickGroup"
    @click-file="handleClickFile"
    @edit-file="handleEditFIle"
    @select="handleSelectFile"
    @back-to-previous-group="handleChangeGroup(backToGroup)"
    @back-to-upper-group="handleChangeGroup(backToUpper)"
    @forward-to-next-group="handleChangeGroup(forwardToGroup)"
  />

  <AppUploadFileModal ref="appUploadFileModalRef" :current-group-id @close="getData" />
  <AppUploadFileGroupModal
    ref="appUploadFileGroupModalRef"
    :current-group-id
    :default-expanded-tree-node-keys="currentGroupPathIds"
    :load-group-tree-node
    @close="currentEditGroupId = undefined"
    @submit="getData"
  />
  <AppUploadFileDetailModal
    ref="fileDetailModalRef"
    :default-expanded-tree-node-keys="currentGroupPathIds"
    :load-group-tree-node
    @submit="getData"
  />
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  margin-bottom: 20px;
}
</style>
