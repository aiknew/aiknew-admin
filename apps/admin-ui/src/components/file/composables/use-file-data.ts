import { SearchScopeEnum } from '@/enums'
import { computed, reactive, ref, toRefs } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import {
  useUploadFileDelete,
  useUploadFilesAndGroups,
  type UploadFilesAndGroupsDto
} from '@/api/upload-file'
import {
  useUploadFileGroupChildren,
  useUploadFileGroupDelete,
  type UploadFileGroupDto
} from '@/api/upload-file-group'

export type FileItem = UploadFilesAndGroupsDto['fileList'][number]
export type GroupItem = UploadFilesAndGroupsDto['groupList'][number]

export const isGroupItem = (item: Record<string, unknown>): item is GroupItem => {
  return !!item.groupName && typeof item.groupName === 'string'
}

export const isFileItem = (item: Record<string, unknown>): item is FileItem => {
  return !isGroupItem(item)
}

export const useFileData = () => {
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const fileList = ref<FileItem[]>([])
  const groupList = ref<GroupItem[]>([])
  const filesAndGroups = ref<(FileItem | GroupItem)[]>([])
  const searchScope = ref<SearchScopeEnum>(SearchScopeEnum.CURRENT_GROUP)
  const searchKeyword = ref('')
  const selectedFiles = ref<FileItem[]>([])
  const currentEditGroupId = ref<string>()
  const currentParentId = ref<string | undefined>()
  const { data: filesAndGroupsData, refetch: fetchFilesAndGroups } = useUploadFilesAndGroups(
    computed(() => ({
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value,
      parentId: currentParentId.value
    }))
  )
  const { mutateAsync: deleteFile } = useUploadFileDelete()
  const { mutateAsync: deleteGroup } = useUploadFileGroupDelete()
  const {
    id: parentGroupId,
    query: { data: childGroups, refetch: fetchChildGroups }
  } = useUploadFileGroupChildren()

  const selectedCount = computed(() => selectedFiles.value.length)

  const getFilesAndGroups = async (parentId: string) => {
    currentParentId.value = searchScope.value === SearchScopeEnum.ALL ? undefined : parentId

    await fetchFilesAndGroups()

    if (filesAndGroupsData.value) {
      fileList.value = filesAndGroupsData.value.fileList
      groupList.value = filesAndGroupsData.value.groupList
      total.value = filesAndGroupsData.value.total
      currentPage.value = filesAndGroupsData.value.current
      pageSize.value = filesAndGroupsData.value.pageSize
      filesAndGroups.value = [...groupList.value, ...fileList.value]
    }
  }

  const getFileById = (fileId: string) => {
    return fileList.value.find((item) => item.id === fileId)
  }

  const fetchChildren = async (groupId: string) => {
    parentGroupId.value = groupId
    await fetchChildGroups()

    return childGroups.value ?? []
  }

  const loadGroupTreeNode = (
    node: Node,
    resolve: (data: Omit<UploadFileGroupDto, 'updatedAt' | 'createdAt'>[]) => void,
    reject: () => void
  ) => {
    // resolve the top level group
    if (!node.key && node.level == 0) {
      return resolve([
        {
          id: '0',
          groupName: 'Top',
          parentId: '',
          ancestors: [],
          order: 0
        }
      ])
    }

    // check if the group was disabled
    if (node.disabled) {
      return resolve([])
    }

    // fetch from the server api
    fetchChildren(String(node.key ?? '0'))
      .then((data) => {
        resolve(
          data.map((item) => {
            // set current group disable
            if (item.id === currentEditGroupId.value) {
              return {
                ...item,
                disabled: true
              }
            }
            return item
          })
        )
      })
      .catch(reject)
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
    getFilesAndGroups,
    deleteFile,
    loadGroupTreeNode,
    deleteGroup
  }
}
