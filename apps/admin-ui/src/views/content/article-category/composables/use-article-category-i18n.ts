import { useI18n } from 'vue-i18n'

export const useArticleCategoryI18n = () => {
  const { t } = useI18n({
    messages: {
      en: {},
      'zh-CN': {
        articleCategoryName: '文章分类名称',
        addTitle: '新增文章分类',
        editTitle: '编辑文章分类'
      },
      'zh-TW': {}
    }
  })

  return {
    t
  }
}
