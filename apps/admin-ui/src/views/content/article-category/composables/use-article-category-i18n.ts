import { useI18n } from 'vue-i18n'

export const useArticleCategoryI18n = () => {
  const { t } = useI18n({
    messages: {
      en: {
        articleCategoryName: 'Article Category Name',
        addTitle: 'Add Article Category',
        editTitle: 'Edit Article Category'
      },
      'zh-CN': {
        articleCategoryName: '文章分类名称',
        addTitle: '新增文章分类',
        editTitle: '编辑文章分类'
      },
      'zh-TW': {
        articleCategoryName: '文章分類名稱',
        addTitle: '新增文章分類',
        editTitle: '編輯文章分類'
      }
    }
  })

  return {
    t
  }
}
