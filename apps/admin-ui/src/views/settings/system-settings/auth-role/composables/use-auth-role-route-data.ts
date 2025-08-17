import { computed, ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import {
  useAuthRouteChildren,
  useAuthRouteAncestors,
  type AuthRouteAncestorsDto
} from '@/api/auth-route'

export const useAuthRoleRouteData = () => {
  const _selectedKeys = ref<string[]>([])
  const expandId = ref('0')
  const { refetch: fetchChildren } = useAuthRouteChildren(expandId)
  const {
    data: ancestorsData,
    refetch: _fetchAncestorsData,
    isFetched: isFetchedAncestors
  } = useAuthRouteAncestors(_selectedKeys)

  let _fetchAncestorsPromise: ReturnType<typeof _fetchAncestorsData>

  const defaultExpandedKeys = computed(() => {
    if (ancestorsData.value) {
      const arr = Object.values(ancestorsData.value.idPath).flat()
      const keys = new Set(arr)

      _selectedKeys.value.forEach((key) => {
        if (keys.has(key)) {
          keys.delete(key)
        }
      })

      return [...keys]
    }

    return []
  })

  const setSelectedKeys = (keys: string[]) => {
    _selectedKeys.value = keys
  }

  const _fetchRouteChildren = (id: string) => {
    expandId.value = id
    return fetchChildren()
  }

  const fetchRouteAncestors = () => {
    if (_selectedKeys.value.length) _fetchAncestorsPromise = _fetchAncestorsData()
  }

  const loadNode = async (node: Node, resolve: (data: AuthRouteAncestorsDto) => void) => {
    // Wait for fetch ancestors finish
    await _fetchAncestorsPromise

    const id = node.data.id ?? '0'
    if (
      (isFetchedAncestors.value && node.level === 0) ||
      defaultExpandedKeys.value.includes(node.data.id)
    ) {
      const data = ancestorsData.value?.list.filter((api) => api.parentId === id) ?? []
      return resolve(data)
    }

    _fetchRouteChildren(id)
      .then(({ data }) => {
        resolve(data ?? [])
      })
      .catch(() => resolve([]))
  }

  return {
    defaultExpandedKeys,
    setSelectedKeys,
    fetchRouteAncestors,
    loadNode
  }
}
