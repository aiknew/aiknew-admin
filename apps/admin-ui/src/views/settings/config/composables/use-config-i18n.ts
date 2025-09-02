import { useI18n, type Composer } from 'vue-i18n'

const messages = {
  en: {
    key: 'Key',
    value: 'Value',
    systemConfig: 'System Config',
    userConfig: 'User Config',
    configType: 'Config Type',
    deleteConfirm: 'Are you sure you want to delete this config?',
    addConfig: 'Add Config',
    editConfig: 'Edit Config',
    searchPlaceholder: 'Search config key or value',
    system: 'System',
    user: 'User',
    config: 'Config',
    enterKey: 'Please enter config key',
    keyRequired: 'Config key cannot be empty',
    enterValue: 'Please enter config value',
    valueRequired: 'Config value cannot be empty',
    valueLengthExceeded: 'Config value length cannot exceed 200 characters',
    keyLengthExceeded: 'Config key length cannot exceed 50 characters',
    enterName: 'Please enter config name',
    name: 'Config Name',
    remark: 'Remark',
    nameRequired: 'Config name cannot be empty',
    nameLengthExceeded: 'Config name length cannot exceed 50 characters',
    enterRemark: 'Please enter remark',
    remarkLengthExceeded: 'Remark length cannot exceed 200 characters'
  },
  'zh-CN': {
    key: '配置键',
    value: '配置值',
    systemConfig: '系统配置',
    userConfig: '用户配置',
    configType: '配置类型',
    deleteConfirm: '确定删除此配置吗？',
    addConfig: '添加配置',
    editConfig: '编辑配置',
    searchPlaceholder: '搜索配置键或值',
    system: '系统',
    user: '用户',
    config: '配置',
    enterKey: '请输入配置键',
    keyRequired: '配置键不能为空',
    enterValue: '请输入配置值',
    valueRequired: '配置值不能为空',
    valueLengthExceeded: '配置值长度不能超过200个字符',
    keyLengthExceeded: '配置键长度不能超过50个字符',
    name: '配置名称',
    remark: '备注',
    nameRequired: '配置名称不能为空',
    nameLengthExceeded: '配置名称长度不能超过50个字符',
    remarkLengthExceeded: '备注长度不能超过200个字符'
  },
  'zh-TW': {
    key: '配置鍵',
    value: '配置值',
    systemConfig: '系統配置',
    userConfig: '用戶配置',
    configType: '配置類型',
    deleteConfirm: '確定刪除此配置嗎？',
    addConfig: '新增配置',
    editConfig: '編輯配置',
    searchPlaceholder: '搜索配置鍵或值',
    system: '系統',
    user: '用戶',
    config: '配置',
    enterKey: '請輸入配置鍵',
    keyRequired: '配置鍵不能為空',
    enterValue: '請輸入配置值',
    valueRequired: '配置值不能為空',
    valueLengthExceeded: '配置值長度不能超過200個字符',
    keyLengthExceeded: '配置鍵長度不能超過50個字符',
    name: '配置名稱',
    remark: '備註',
    nameRequired: '配置名稱不能為空',
    nameLengthExceeded: '配置名稱長度不能超過50個字符',
    remarkLengthExceeded: '備註長度不能超過200個字符'
  }
}

let instance: Composer<typeof messages>

export const useConfigI18n = () => {
  if (!instance) {
    instance = useI18n({ messages })
  }

  return instance
}
