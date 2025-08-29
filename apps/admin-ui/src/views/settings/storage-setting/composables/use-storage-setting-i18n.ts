import { useI18n, type Composer } from 'vue-i18n'

const messages = {
  en: {
    storageType: 'Storage Type',
    addTitle: 'Add Storage',
    editTitle: 'Edit Storage',
    hostname: 'hostname',
    active: 'active',
    normalStatus: 'Normal',
    disabledStatus: 'Disabled',
    disabledUploadStatus: 'Disabled Upload',
    priority: 'Priority'
  },
  'zh-CN': {
    storageType: '存储类型',
    addTitle: '添加存储',
    editTitle: '编辑存储',
    hostname: '主机名',
    active: '啟用',
    normalStatus: '正常',
    disabledStatus: '禁用',
    disabledUploadStatus: '禁用上传',
    priority: '优先级'
  },
  'zh-TW': {
    storageType: '存储类型',
    addTitle: '添加存储',
    editTitle: '编辑存储',
    hostname: '主机名',
    active: '啟用',
    normalStatus: '正常',
    disabledStatus: '禁用',
    disabledUploadStatus: '禁用上傳',
    priority: '優先級'
  }
}

let instance: Composer<typeof messages>

export const useStorageSettingI18n = () => {
  if (!instance) {
    instance = useI18n({ messages })
  }

  return instance
}
