import { useFileData } from './use-file-data'
import type { IUploadFile, IUploadFileGroup } from '@aiknew/shared-types'
import { type Ref, useTemplateRef } from 'vue'
import AppFileOperations from '../app-file-operations.vue'
import AppUploadFileModal from '../file-modal/app-upload-file-modal.vue'
import AppUploadFileGroupModal from '../file-modal/app-upload-file-group-modal.vue'
import AppFileGroupPath from '../app-file-group-path.vue'
import { useFileGroupPath } from './use-file-group-path'
import AppUploadFileDetailModal, {
  type FileItemWithGroupName,
} from '../file-modal/app-upload-file-detail-modal.vue'
import { SearchScopeEnum } from '../enums'
import AppFileListContainer from '../app-file-list-container.vue'
import type { IUploadFilesAndGroupsData } from '@aiknew/shared-types'

export const useFileManager = (
  filesAndGroupsData: Ref<IUploadFilesAndGroupsData>,
) => {
  const appUploadFileModalRef =
    useTemplateRef<InstanceType<typeof AppUploadFileModal>>(
      'appUploadFileModal',
    )
  const appUploadFileGroupModalRef = useTemplateRef<
    InstanceType<typeof AppUploadFileGroupModal>
  >('appUploadFileGroupModal')
  const fileDetailModalRef =
    useTemplateRef<InstanceType<typeof AppUploadFileDetailModal>>(
      'fileDetailModal',
    )
  const appFileListContainerRef = useTemplateRef<
    InstanceType<typeof AppFileListContainer>
  >('appFileListContainer')

  const {
    searchKeyword,
    currentPage,
    pageSize,
    total,
    filesAndGroups,
    searchScope,
    selectedCount,
    selectedFiles,
    currentEditGroupId,
    getFileById,
  } = useFileData(filesAndGroupsData)

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
    forwardToGroup,
  } = useFileGroupPath(searchScope)

  const handleUpload = () => {
    appUploadFileModalRef.value?.show()
  }

  const getFileAndGroupName = (
    fileId: string,
  ): FileItemWithGroupName | undefined => {
    const file = getFileById(fileId)
    if (file) {
      return {
        ...file,
        groupName: currentGroupName.value,
      }
    }
  }

  const handleEditFIle = (item: IUploadFile) => {
    const file = getFileAndGroupName(item.id)
    if (file) {
      fileDetailModalRef.value?.edit(file)
    }
  }

  const handleClickFile = (item: IUploadFile) => {
    const file = getFileAndGroupName(item.id)
    if (file) {
      fileDetailModalRef.value?.show(file)
    }
  }

  const handleAddGroup = () => {
    appUploadFileGroupModalRef.value?.add()
  }

  const handleEditGroup = (item: IUploadFileGroup) => {
    currentEditGroupId.value = item.id
    appUploadFileGroupModalRef.value?.edit(item)
  }

  const handleClickGroup = (item: IUploadFileGroup) => {
    const currentGroup = { groupId: item.id, groupName: item.groupName }

    // clear search keyword
    searchKeyword.value = ''

    if (searchScope.value === SearchScopeEnum.ALL) {
      enterGroupFromAllList([
        ...item.ancestors.map((ancestor) => ({
          groupId: ancestor.ancestorId,
          groupName: ancestor.ancestor.groupName,
        })),
        currentGroup,
      ])

      // reset search scope to "current group"
      searchScope.value = SearchScopeEnum.CURRENT_GROUP
    } else {
      enterGroup(currentGroup)
    }
  }

  const handleJumpToGroup = (index: number) => {
    jumpToGroup(index)
  }

  const handleSelectFile = (selection: IUploadFile[]) => {
    selectedFiles.value = selection
  }

  const handleClearSelected = () => {
    selectedFiles.value = []
    appFileListContainerRef.value?.clearSelection()
  }

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
    AppUploadFileModal,
    AppUploadFileGroupModal,
    AppFileGroupPath,
    AppUploadFileDetailModal,
  }
}
