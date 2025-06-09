import { useFileData, type FileItem, type GroupItem } from './use-file-data'
import { useDebounceFn } from '@vueuse/core'
import { onMounted, useTemplateRef } from 'vue'
import AppFileOperations from '../app-file-operations.vue'
import AppUploadFileModal from '../file-modal/app-upload-file-modal.vue'
import AppUploadFileGroupModal from '../file-modal/app-upload-file-group-modal.vue'
import AppFileGroupPath from '../app-file-group-path.vue'
import { useFileGroupPath } from './use-file-group-path'
import AppUploadFileDetailModal, {
  type FileItemWithGroupName
} from '../file-modal/app-upload-file-detail-modal.vue'
import { SearchScopeEnum } from '@/enums'
import AppFileListContainer from '../app-file-list-container.vue'

export const useFile = () => {
  const appUploadFileModalRef =
    useTemplateRef<InstanceType<typeof AppUploadFileModal>>('appUploadFileModalRef')
  const appUploadFileGroupModalRef = useTemplateRef<InstanceType<typeof AppUploadFileGroupModal>>(
    'appUploadFileGroupModalRef'
  )
  const fileDetailModalRef =
    useTemplateRef<InstanceType<typeof AppUploadFileDetailModal>>('fileDetailModalRef')
  const appFileListContainerRef =
    useTemplateRef<InstanceType<typeof AppFileListContainer>>('appFileListContainerRef')

  const {
    currentGroupPathIds,
    currentGroupPath,
    currentGroupId,
    currentGroupName,
    jumpToGroup,
    enterGroup,
    enterGroupFromAllList,
    backToGroup,
    backToUpper,
    forwardToGroup
  } = useFileGroupPath()
  const {
    filesAndGroups,
    searchScope,
    searchKeyword,
    selectedCount,
    currentPage,
    pageSize,
    total,
    selectedFiles,
    currentEditGroupId,
    getFilesAndGroups,
    deleteFile,
    loadGroupTreeNode,
    getFileById,
    deleteGroup
  } = useFileData()

  // Upload file
  const handleUpload = () => {
    appUploadFileModalRef.value?.show()
  }

  // Delete file
  const handleDeleteFile = useDebounceFn((item: FileItem) => {
    deleteFile(item.id).then(() => getData())
  }, 300)

  const getFileAndGroupName = (fileId: string): FileItemWithGroupName | undefined => {
    const file = getFileById(fileId)
    if (file) {
      return {
        ...file,
        groupName: currentGroupName.value
      }
    }
  }

  // Edit file
  const handleEditFIle = (item: FileItem) => {
    const file = getFileAndGroupName(item.id)
    if (file) {
      fileDetailModalRef.value?.edit(file)
    }
  }

  // Click file
  const handleClickFile = (item: FileItem) => {
    const file = getFileAndGroupName(item.id)
    if (file) {
      fileDetailModalRef.value?.show(file)
    }
  }

  // Add group
  const handleAddGroup = () => {
    appUploadFileGroupModalRef.value?.add()
  }

  // Edit group
  const handleEditGroup = (item: GroupItem) => {
    currentEditGroupId.value = item.id
    appUploadFileGroupModalRef.value?.edit(item)
  }

  // Delete group
  const handleDeleteGroup = (item: GroupItem) => {
    deleteGroup(item.id).then(() => getData())
  }

  // Click group
  const handleClickGroup = (item: GroupItem) => {
    const currentGroup = { groupId: item.id, groupName: item.groupName }
    searchKeyword.value = ''
    if (searchScope.value === SearchScopeEnum.ALL) {
      searchScope.value = SearchScopeEnum.CURRENT_GROUP
      enterGroupFromAllList([
        ...item.ancestors!.map((ancestor) => ({
          groupId: ancestor.ancestorId,
          groupName: ancestor.ancestor.groupName
        })),
        currentGroup
      ])
    } else {
      enterGroup(currentGroup)
    }
    getData()
  }

  // Jump to group
  const handleJumpToGroup = (index: number) => {
    jumpToGroup(index)
    getData()
  }

  // Change group
  const handleChangeGroup = (changeGroupFn: () => void) => {
    changeGroupFn()
    getData()
  }

  // Handle select file
  const handleSelectFile = (selection: FileItem[]) => {
    selectedFiles.value = selection
  }

  // Clear all selected files
  const handleClearSelected = () => {
    selectedFiles.value = []
    appFileListContainerRef.value?.clearSelection()
  }

  // Delete all selected files
  const handleDeleteSelected = () => {
    selectedFiles.value.forEach((item) => {
      deleteFile(item.id).then(() => {
        handleClearSelected()
        getData()
      })
    })
  }

  // Search files and groups by keyword
  const handleSearch = useDebounceFn(() => {
    getData()
  })

  // Get initial data
  const getData = () => {
    getFilesAndGroups(currentGroupId.value)
  }

  onMounted(() => {
    getData()
  })

  return {
    // vars
    appUploadFileModalRef,
    currentGroupId,
    currentEditGroupId,
    currentGroupPathIds,
    currentGroupPath,
    filesAndGroups,
    selectedCount,
    currentPage,
    pageSize,
    total,
    SearchScopeEnum,
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
  }
}
