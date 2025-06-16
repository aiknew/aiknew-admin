import { useAdminApiChildren, useAdminApisAncestors, type AdminApi } from '@/api/admin-api'
import { computed, ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { useLangStore } from '@/stores/lang'
import { useAdminApiI18n } from './use-admin-api-i18n'
import { ElMessage } from 'element-plus'

export const useAdminApiData = () => {
  const editId = ref('0')
  const disabledSelectIds = ref<string[]>([])

  const { t } = useAdminApiI18n()
  const langStore = useLangStore()
  const expandParentId = ref('0')
  const { refetch: fetchApiChildren } = useAdminApiChildren(expandParentId)
  const { data: adminApiAncestors, refetch: _fetchAdminApisAncestorsData } = useAdminApisAncestors(
    computed(() => [editId.value])
  )
  let _fetchAdminApisPromise: ReturnType<typeof _fetchAdminApisAncestorsData>

  const defaultExpandedKeys = computed(() => {
    if (adminApiAncestors.value) {
      const idPathArr = adminApiAncestors.value.idPath[editId.value] ?? []

      return ['0'].concat(idPathArr.filter((id) => id !== editId.value))
    }

    return ['0']
  })

  const _fetchAdminApiChildren = (parentId: string) => {
    expandParentId.value = parentId
    return fetchApiChildren()
  }

  const addDisabledIds = (idArr: string[]) => {
    disabledSelectIds.value.push(...idArr)
  }

  const isDisabled = (id: string) => {
    return disabledSelectIds.value.includes(id)
  }

  const resetEditId = () => {
    editId.value = '0'
  }

  const fetchApiAncestors = () => {
    _fetchAdminApisPromise = _fetchAdminApisAncestorsData()
  }

  const loadNode = async (
    node: Node,
    resolve: (data: Omit<AdminApi, 'order' | 'createdAt' | 'updatedAt'>[]) => void
  ) => {
    // Wait for fetch api ancestors finish
    await _fetchAdminApisPromise

    // Resolve the top level data
    if (node.level === 0) {
      return resolve([
        {
          id: '0',
          translations: langStore.enabledLangs.map((lang) => {
            return {
              apiName: t('top'),
              langKey: lang.key
            }
          })
        } as AdminApi
      ])
    }

    // Resolve the data fetched from the fetchAncestors API
    if (defaultExpandedKeys.value.includes(node.data.id) && node.data.id !== '0') {
      const list =
        adminApiAncestors.value?.list.filter((item) => item.parentId === node.data.id) ?? []
      return resolve(list)
    }

    // Resolve data from API
    _fetchAdminApiChildren(node.data.id).then(({ data }) => {
      const list = data ?? []

      if (isDisabled(node.data.id)) {
        ElMessage({
          type: 'warning',
          message: t('cantSelectChildrenAsOwnSuperior')
        })
        addDisabledIds(list.map((item) => item.id))
      }

      resolve(list)
    })
  }

  return {
    editId,
    disabledSelectIds,
    defaultExpandedKeys,
    addDisabledIds,
    isDisabled,
    resetEditId,
    fetchApiAncestors,
    loadNode
  }
}
