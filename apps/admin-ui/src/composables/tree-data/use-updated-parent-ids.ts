import { ref } from "vue"

export const useUpdatedParentIds = <T extends string | number = string>() => {
  const updatedParentIds = ref<Set<T>>(new Set())

  const addUpdatedParentId = (id: T) => {
    updatedParentIds.value.add(id as never)
  }

  const getUpdatedParentIds = () => {
    return [...updatedParentIds.value]
  }

  return {
    addUpdatedParentId,
    getUpdatedParentIds,
  }
}
