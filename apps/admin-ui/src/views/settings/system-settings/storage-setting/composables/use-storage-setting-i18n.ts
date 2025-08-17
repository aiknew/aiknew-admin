import { useI18n, type Composer } from 'vue-i18n'

const messages = {
  en: {
    storageType: 'Storage Type',
    addTitle: 'Add Storage',
    editTitle: 'Edit Storage',
    hostname: 'hostname',
    active: 'active'
  },
  'zh-CN': {
    storageType: '存储类型',
    addTitle: '添加存储',
    editTitle: '编辑存储',
    hostname: '主机名',
    active: '啟用'
  },
  'zh-TW': {
    storageType: '存储类型',
    addTitle: '添加存儲',
    editTitle: '編輯存儲',
    hostname: '主機名',
    active: '启用'
  }
}

let instance: Composer<typeof messages>

export const useStorageSettingI18n = () => {
  if (!instance) {
    instance = useI18n({ messages })
  }

  return instance
}
