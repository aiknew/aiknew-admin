import { SearchScopeEnum } from '@/enums'
import { computed, Ref, ref } from 'vue'
import type {
  IUploadFile,
  IUploadFileGroup,
  IUploadFilesAndGroupsData,
} from '@aiknew/shared-types'
import { resolveURL } from '@aiknew/shared-ui-utils'

export const isGroupItem = (item: unknown): item is IUploadFileGroup => {
  return (
    typeof item === 'object' &&
    !!item &&
    'groupName' in item &&
    typeof item.groupName === 'string'
  )
}

export const isFileItem = (item: unknown): item is IUploadFile => {
  return !isGroupItem(item)
}

export const useFileData = (
  filesAndGroupsData: Ref<IUploadFilesAndGroupsData>,
) => {
  const searchScope = ref<SearchScopeEnum>(SearchScopeEnum.CURRENT_GROUP)
  const searchKeyword = ref('')
  const selectedFiles = ref<IUploadFile[]>([])
  const currentEditGroupId = ref<string>()

  const currentPage = computed<number>(() => filesAndGroupsData.value.current)
  const pageSize = computed<number>(() => filesAndGroupsData.value.pageSize)
  const total = computed<number>(() => filesAndGroupsData.value.total)
  const fileList = computed<IUploadFile[]>(() =>
    filesAndGroupsData.value.fileList.map((file) => {
      return {
        ...file,
        filePath: resolveURL(file.storage.hostname, file.filePath),
      }
    }),
  )
  const groupList = computed<IUploadFileGroup[]>(
    () => filesAndGroupsData.value.groupList,
  )
  const filesAndGroups = computed<(IUploadFile | IUploadFileGroup)[]>(() => [
    ...filesAndGroupsData.value.groupList,
    ...fileList.value,
  ])
  const selectedCount = computed(() => selectedFiles.value.length)

  const getFileById = (fileId: string) => {
    return fileList.value.find((item) => item.id === fileId)
  }

  return {
    currentPage,
    pageSize,
    total,
    fileList,
    groupList,
    filesAndGroups,
    searchScope,
    searchKeyword,
    selectedFiles,
    selectedCount,
    currentEditGroupId,
    getFileById,
  }
}
