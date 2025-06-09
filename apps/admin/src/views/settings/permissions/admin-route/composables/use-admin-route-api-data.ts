import { useAdminApiChildren, useAdminApisAncestors, type AdminApi } from '@/api/admin-api'
import { computed, ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'

export const useAdminRouteApiData = () => {
  const _selectedApiKeys = ref<string[]>([])
  const expandApiId = ref('0')
  const { refetch: fetchApiChildren } = useAdminApiChildren(expandApiId)
  const {
    data: _adminApisAncestors,
    refetch: _fetchAdminApisAncestorsData,
    isFetched: isFetchedApisAncestors
  } = useAdminApisAncestors(_selectedApiKeys)

  let _fetchAdminApisPromise: ReturnType<typeof _fetchAdminApisAncestorsData>

  const defaultExpandedApiKeys = computed(() => {
    if (_adminApisAncestors.value) {
      const arr = Object.values(_adminApisAncestors.value.idPath).flat()
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

  const _fetchAdminApiChildren = (id: string) => {
    expandApiId.value = id
    return fetchApiChildren()
  }

  const fetchApiAncestors = () => {
    if (_selectedApiKeys.value.length) _fetchAdminApisPromise = _fetchAdminApisAncestorsData()
  }

  const loadApiNode = async (
    node: Node,
    resolve: (data: Omit<AdminApi, 'order' | 'createdAt' | 'updatedAt'>[]) => void
  ) => {
    // Wait for fetch ancestors finish
    await _fetchAdminApisPromise

    const id = node.data.id ?? '0'
    if (
      (isFetchedApisAncestors.value && node.level === 0) ||
      defaultExpandedApiKeys.value.includes(node.data.id)
    ) {
      const data = _adminApisAncestors.value?.list.filter((api) => api.parentId === id) ?? []
      return resolve(data)
    }

    _fetchAdminApiChildren(id)
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
