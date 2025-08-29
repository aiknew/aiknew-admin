import { useAuthApiChildren, useAuthApisAncestors, type AuthApi } from '@/api/auth-api'
import { computed, ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'

export const useAuthRouteApiData = () => {
  const _selectedApiKeys = ref<string[]>([])
  const expandApiId = ref('0')
  const { refetch: fetchApiChildren } = useAuthApiChildren(expandApiId)
  const {
    data: _authApisAncestors,
    refetch: _fetchAuthApisAncestorsData,
    isFetched: isFetchedApisAncestors
  } = useAuthApisAncestors(_selectedApiKeys)

  let _fetchAuthApisPromise: ReturnType<typeof _fetchAuthApisAncestorsData>

  const defaultExpandedApiKeys = computed(() => {
    if (_authApisAncestors.value) {
      const arr = Object.values(_authApisAncestors.value.idPath).flat()
      const keys = new Set(arr)

      _selectedApiKeys.value.forEach((key) => {
        if (keys.has(key)) {
          keys.delete(key)
        }
      })

      return [...keys]
    }

    return []
  })

  const setSelectedApiKeys = (keys: string[]) => {
    _selectedApiKeys.value = keys
  }

  const _fetchAuthApiChildren = (id: string) => {
    expandApiId.value = id
    return fetchApiChildren()
  }

  const fetchApiAncestors = () => {
    if (_selectedApiKeys.value.length) _fetchAuthApisPromise = _fetchAuthApisAncestorsData()
  }

  const loadApiNode = async (
    node: Node,
    resolve: (data: Omit<AuthApi, 'order' | 'createdAt' | 'updatedAt'>[]) => void
  ) => {
    // Wait for fetch ancestors finish
    await _fetchAuthApisPromise

    const id = node.data.id ?? '0'
    if (
      (isFetchedApisAncestors.value && node.level === 0) ||
      defaultExpandedApiKeys.value.includes(node.data.id)
    ) {
      const data = _authApisAncestors.value?.list.filter((api) => api.parentId === id) ?? []
      return resolve(data)
    }

    _fetchAuthApiChildren(id)
      .then(({ data }) => {
        resolve(data ?? [])
      })
      .catch(() => resolve([]))
  }

  return {
    defaultExpandedApiKeys,
    setSelectedApiKeys,
    fetchApiAncestors,
    loadApiNode
  }
}
