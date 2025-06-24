import { useI18n } from 'vue-i18n'

export const useArticleI18n = () => {
  const { t } = useI18n({
    messages: {
      en: {
        articleTitle: 'Article Title',
        articleCategory: 'Article Category',
        addTitle: 'Add Article',
        editTitle: 'Edit Article',
        fakeViewCount: 'Fake View Count',
        fakeViewCountTips: 'View Count = Real View Count + Fake View Count',
        content: 'Article Content'
      },
      'zh-CN': {
        articleTitle: '文章标题',
        articleCategory: '文章分类',
        addTitle: '新增文章',
        editTitle: '编辑文章',
        fakeViewCount: '虚拟浏览量',
        fakeViewCountTips: '浏览量 = 真实浏览量 + 虚拟浏览量',
        content: '文章内容'
      },
      'zh-TW': {
        articleTitle: '文章標題',
        articleCategory: '文章分類',
        addTitle: '新增文章',
        editTitle: '編輯文章',
        fakeViewCount: '虛擬瀏覽量',
        fakeViewCountTips: '瀏覽量 = 真實瀏覽量 + 虛擬瀏覽量',
        content: '文章內容'
      }
    }
  })

  return {
    t
  }
}
