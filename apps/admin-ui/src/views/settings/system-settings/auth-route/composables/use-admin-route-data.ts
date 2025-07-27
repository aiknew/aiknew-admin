import {
  useAuthRouteAncestors,
  useAuthRouteChildren,
  type AuthRoute,
  type AuthRouteAncestorsDto
} from '@/api/auth-route'
import { computed, ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { useLangStore } from '@/stores/lang'
import { useAdminRouteI18n } from './use-admin-route-i18n'

export const useAdminRouteData = () => {
  const langStore = useLangStore()
  const { t } = useAdminRouteI18n()
  const editRouteId = ref('0')
  const parentRouteId = ref('')
  const expandParentId = ref('0')
  const { refetch: fetchApiChildren } = useAuthRouteChildren(expandParentId)
  const { data: adminRouteAncestors, refetch: _fetchAdminRoutesAncestors } = useAuthRouteAncestors(
    computed(() => [editRouteId.value])
  )

  let _fetchAdminRoutesPromise: ReturnType<typeof _fetchAdminRoutesAncestors>

  const defaultExpandedRouteKeys = computed(() => {
    if (adminRouteAncestors.value) {
      const idPathArr = adminRouteAncestors.value.idPath[editRouteId.value] ?? []

      return ['0'].concat(idPathArr.filter((id) => id !== editRouteId.value))
    }

    return ['0']
  })

  const setEditRouteId = (id: string) => {
    editRouteId.value = id
  }

  const fetchRouteAncestors = () => {
    _fetchAdminRoutesPromise = _fetchAdminRoutesAncestors()
  }

  const _fetchAdminRouteChildren = (parentId: string) => {
    expandParentId.value = parentId
    return fetchApiChildren()
  }

  const loadNode = async (node: Node, resolve: (data: AuthRouteAncestorsDto) => void) => {
    await _fetchAdminRoutesPromise

    if (node.level === 0) {
      return resolve([
        {
          id: '0',
          translations: langStore.enabledLangs.map((lang) => {
            return {
              routeName: t('top'),
              langKey: lang.key
            }
          })
        } as AuthRouteAncestorsDto[number]
      ])
    }

    if (node.level >= defaultExpandedRouteKeys.value.length) {
      _fetchAdminRouteChildren(node.data.id).then(({ data }) => {
        resolve(data ?? [])
      })
      return
    }

    return resolve(
      adminRouteAncestors.value?.list.filter((item) => item.parentId === node.data.id) ?? []
    )
  }

  return {
    editRouteId,
    parentRouteId,
    defaultExpandedRouteKeys,
    setEditRouteId,
    fetchRouteAncestors,
    loadNode
  }
}
