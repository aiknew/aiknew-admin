import { SearchScopeEnum } from '@/enums'
import { computed, Ref, ref } from 'vue'

export interface GroupPathItem {
  groupId: string
  groupName: string
}

const topGroup = { groupId: '0', groupName: 'Top' }

export const useFileGroupPath = (searchScope: Ref<SearchScopeEnum>) => {
  const forwardStack = ref<GroupPathItem[][]>([])
  const backwardStack = ref<GroupPathItem[][]>([])
  const currentStack = ref<GroupPathItem[]>([topGroup])

  const currentGroupId = computed<string | undefined>(() => {
    if (searchScope.value === SearchScopeEnum.ALL) {
      return undefined
    }
    return currentStack.value[currentStack.value.length - 1].groupId
  })

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
    currentGroupId,
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
