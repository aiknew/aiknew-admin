import { computed, ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { useLangStore } from '@/stores/lang'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import {
  useArticleCategoryAncestors,
  useArticleCategoryChildren,
  type ArticleCategory
} from '@/api/article-category'

export const useArticleCategoryData = () => {
  const editId = ref(0)
  const disabledSelectIds = ref<number[]>([])

  const { t } = useI18n()
  const langStore = useLangStore()
  const {
    parentId: expandParentId,
    query: { refetch: fetchArticleCategoryChildren }
  } = useArticleCategoryChildren()
  const { data: articleCategoryAncestors, refetch: _fetchArticleCategoryAncestorsData } =
    useArticleCategoryAncestors(computed(() => [editId.value]))
  let _fetchPromise: ReturnType<typeof _fetchArticleCategoryAncestorsData>

  const defaultExpandedKeys = computed(() => {
    if (articleCategoryAncestors.value) {
      const idPathArr = articleCategoryAncestors.value.idPath[editId.value] ?? []

      return [0].concat(idPathArr.filter((id) => id !== editId.value))
    }

    return [0]
  })

  const _fetchArticleCategoryChildren = (parentId: number) => {
    expandParentId.value = parentId
    return fetchArticleCategoryChildren()
  }

  const addDisabledIds = (idArr: number[]) => {
    disabledSelectIds.value.push(...idArr)
  }

  const isDisabled = (id: number) => {
    return disabledSelectIds.value.includes(id)
  }

  const resetEditId = () => {
    editId.value = 0
  }

  const fetchArticleCategoryAncestors = () => {
    _fetchPromise = _fetchArticleCategoryAncestorsData()
  }

  const loadNode = async (
    node: Node,
    resolve: (data: Omit<ArticleCategory, 'order' | 'createdAt' | 'updatedAt'>[]) => void
  ) => {
    // Wait for fetch api ancestors finish
    await _fetchPromise

    // Resolve the top level data
    if (node.level === 0) {
      return resolve([
        {
          id: 0,
          translations: langStore.enabledLangs.map((lang) => {
            return {
              name: t('top'),
              langKey: lang.key
            }
          })
        } as ArticleCategory
      ])
    }

    // Resolve the data fetched from the fetchAncestors API
    if (defaultExpandedKeys.value.includes(node.data.id) && node.data.id !== 0) {
      const list =
        articleCategoryAncestors.value?.list.filter((item) => item.parentId === node.data.id) ?? []
      return resolve(list)
    }

    // Resolve data from API
    _fetchArticleCategoryChildren(node.data.id).then(({ data }) => {
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
    fetchArticleCategoryAncestors,
    loadNode
  }
}
