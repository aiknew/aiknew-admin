import { useI18n, type Composer } from 'vue-i18n'

const messages = {
  en: {
    name: 'Name',
    key: 'Key',
    order: 'Order',
    orderTips: 'Higher values appear later',
    status: 'Status',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    operations: 'Operations',
    add: 'Add',
    addTitle: 'Add Dictionary Type',
    editTitle: 'Edit Dictionary Type',
    deleteConfirm: 'Are you sure to delete this dictionary type?',
    dictTypeName: 'Dictionary Type',
    dictItem: 'Dictionary Item',
    dictLabel: 'Dictionary Label',
    dictValue: 'Dictionary Value',
    addDictTitle: 'Add Dictionary Item',
    editDictTitle: 'Edit Dictionary Item'
  },
  'zh-CN': {
    name: '名称',
    key: '键值',
    order: '排序',
    orderTips: '值越大越靠后显示',
    status: '状态',
    createdAt: '创建时间',
    updatedAt: '更新时间',
    operations: '操作',
    add: '新增',
    addTitle: '新增字典类型',
    editTitle: '编辑字典类型',
    deleteConfirm: '确定要删除这个字典类型吗？',
    dictTypeName: '字典类型',
    dictItem: '字典项',
    dictLabel: '字典标签',
    dictValue: '字典值',
    addDictTitle: '新增字典项',
    editDictTitle: '编辑字典项'
  },
  'zh-TW': {
    name: '名稱',
    key: '鍵值',
    order: '排序',
    orderTips: '值越大越靠後顯示',
    status: '狀態',
    createdAt: '創建時間',
    updatedAt: '更新時間',
    operations: '操作',
    add: '新增',
    addTitle: '新增字典類型',
    editTitle: '編輯字典類型',
    deleteConfirm: '確定要刪除這個字典類型嗎？',
    dictTypeName: '字典類型',
    dictItem: '字典項',
    dictLabel: '字典標籤',
    dictValue: '字典值',
    addDictTitle: '新增字典項',
    editDictTitle: '編輯字典項'
  }
}

let instance: Composer<typeof messages>

export const useDictTypeI18n = () => {
  if (!instance) {
    instance = useI18n({ messages })
  }

  return instance
}
