import { useI18n, type Composer } from 'vue-i18n'

const messages = {
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

let instance: Composer<typeof messages>

export const useArticleCategoryI18n = () => {
  if (!instance) {
    instance = useI18n({ messages })
  }

  return instance
}
