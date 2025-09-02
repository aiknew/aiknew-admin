import {
  useAuthRouteAncestors,
  useAuthRouteChildren,
  type AuthRouteAncestorsDto
} from '@/api/auth-route'
import { computed, ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { useLangStore } from '@/stores/lang'
import { useAuthRouteI18n } from './use-auth-route-i18n'

export const useAuthRouteData = () => {
  const langStore = useLangStore()
  const { t } = useAuthRouteI18n()
  const editRouteId = ref('0')
  const parentRouteId = ref('')
  const expandParentId = ref('0')
  const { refetch: fetchApiChildren } = useAuthRouteChildren(expandParentId)
  const { data: authRouteAncestors, refetch: _fetchAuthRoutesAncestors } = useAuthRouteAncestors(
    computed(() => [editRouteId.value])
  )

  let _fetchAuthRoutesPromise: ReturnType<typeof _fetchAuthRoutesAncestors>

  const defaultExpandedRouteKeys = computed(() => {
    if (authRouteAncestors.value) {
      const idPathArr = authRouteAncestors.value.idPath[editRouteId.value] ?? []

      return ['0'].concat(idPathArr.filter((id) => id !== editRouteId.value))
    }

    return ['0']
  })

  const setEditRouteId = (id: string) => {
    editRouteId.value = id
  }

  const fetchRouteAncestors = () => {
    _fetchAuthRoutesPromise = _fetchAuthRoutesAncestors()
  }

  const _fetchAuthRouteChildren = (parentId: string) => {
    expandParentId.value = parentId
    return fetchApiChildren()
  }

  const loadNode = async (node: Node, resolve: (data: AuthRouteAncestorsDto) => void) => {
    await _fetchAuthRoutesPromise

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
      _fetchAuthRouteChildren(node.data.id).then(({ data }) => {
        resolve(data ?? [])
      })
      return
    }

    return resolve(
      authRouteAncestors.value?.list.filter((item) => item.parentId === node.data.id) ?? []
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
