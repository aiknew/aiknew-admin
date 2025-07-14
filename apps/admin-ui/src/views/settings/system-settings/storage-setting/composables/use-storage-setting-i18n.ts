import { useI18n } from 'vue-i18n'

export const useStorageSettingI18n = () => {
  const { t } = useI18n({
    messages: {
      en: {
        storageType: 'Storage Type',
        addTitle: 'Add Storage',
        editTitle: 'Edit Storage'
      },
      'zh-CN': {
        storageType: '存储类型',
        addTitle: '添加存储',
        editTitle: '编辑存储'
      },
      'zh-TW': {
        storageType: '存储类型',
        addTitle: '添加存儲',
        editTitle: '編輯存儲'
      }
    }
  })

  return {
    t
  }
}
