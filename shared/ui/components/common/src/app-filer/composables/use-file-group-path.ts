import { IUploadFileQuery } from '@aiknew/shared-types'
import { SearchScopeEnum } from '../enums'
import { computed, type Ref, ref, watch } from 'vue'

export interface GroupPathItem {
  groupId: string
  groupName: string
}

const topGroup = { groupId: '0', groupName: 'Top' }

export const useFileGroupPath = (searchScope: Ref<SearchScopeEnum>, query: Ref<IUploadFileQuery>) => {
  const forwardStack = ref<GroupPathItem[][]>([])
  const backwardStack = ref<GroupPathItem[][]>([])
  const currentStack = ref<GroupPathItem[]>([topGroup])

  watch(() => currentStack, () => {
    if (searchScope.value === SearchScopeEnum.ALL) {
      query.value.parentId = undefined
      return
    }

    query.value.parentId = currentStack.value[currentStack.value.length - 1].groupId
  }, { deep: true })

  const currentGroupName = computed(() => {
    return currentStack.value[currentStack.value.length - 1].groupName
  })

  const currentGroupPath = computed(() => {
    return currentStack.value
  })

  const currentGroupPathIds = computed(() => {
    return currentStack.value.map((item) => item.groupId)
  })

  const enterGroup = (group: GroupPathItem) => {
    backwardStack.value.push([...currentStack.value])
    currentStack.value.push(group)
    forwardStack.value = []
  }

  const enterGroupFromAllList = (path: GroupPathItem[]) => {
    backwardStack.value.push([...currentStack.value])
    currentStack.value = [topGroup, ...path]
    forwardStack.value = []
  }

  const jumpToGroup = (index: number) => {
    backwardStack.value.push([...currentStack.value])
    currentStack.value.splice(index + 1)
    forwardStack.value = []
  }

  const backToGroup = () => {
    const currentGroupPath = backwardStack.value.pop()
    if (currentGroupPath) {
      forwardStack.value.push([...currentStack.value])
      currentStack.value = currentGroupPath
    }
  }

  const backToUpper = () => {
    if (currentStack.value.length === 1) return
    backwardStack.value.push([...currentStack.value])
    currentStack.value.pop()
    forwardStack.value = []
  }

  const forwardToGroup = () => {
    const currentGroupPath = forwardStack.value.pop()
    if (currentGroupPath) {
      backwardStack.value.push([...currentStack.value])
      currentStack.value = currentGroupPath
    }
  }

  return {
    currentGroupPath,
    currentGroupName,
    currentGroupPathIds,
    enterGroup,
    enterGroupFromAllList,
    jumpToGroup,
    backToGroup,
    forwardToGroup,
    backToUpper,
  }
}
