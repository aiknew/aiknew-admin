import { useI18n, type Composer } from 'vue-i18n'

const messages = {
  en: {
    requestMethod: 'Request method',
    permissionNameRequired: 'permission name cannot be empty',
    permissionNameLabel: 'permission Name',
    addPermission: 'Add permission',
    editPermission: 'Edit permission',
    path: 'Path',
    source: 'Source',
    builtInPermission: 'Built In',
    externalPermission: 'External',
    addPermissionGroup: 'Add permission Group',
    editPermissionGroup: 'Edit permission Group',
    permissionGroupName: 'permission Group Name',
    permissionGroup: 'permission Group',
    permissionKey: 'permission Key',
    permission: 'Permission'
  },
  'zh-CN': {
    requestMethod: '请求方法',
    permissionNameRequired: '权限名称不能为空',
    permissionNameLabel: '权限名称',
    addPermission: '新增权限',
    editPermission: '编辑权限',
    path: '请求路径',
    source: '来源',
    builtInPermission: '内置',
    externalPermission: '外部',
    addPermissionGroup: '新增权限分组',
    editPermissionGroup: '编辑权限分组',
    permissionGroupName: '权限分组名称',
    permissionGroup: '权限分组',
    permissionKey: '权限标识符',
    permission: '权限'
  },
  'zh-TW': {
    requestMethod: '請求方法',
    permissionNameRequired: '權限名稱不能為空',
    permissionNameLabel: '權限名稱',
    addPermission: '新增權限',
    editPermission: '编辑權限',
    path: '請求路徑',
    source: '來源',
    builtInPermission: '內建',
    externalPermission: '外部',
    addPermissionGroup: '新增權限分組',
    editPermissionGroup: '編輯權限分組',
    permissionGroupName: '權限分組名稱',
    permissionGroup: '權限分組',
    permissionKey: '權限標識符',
    permission: '權限'
  }
}
let instance: Composer<typeof messages>

export const usePermissionI18n = () => {
  if (!instance) {
    instance = useI18n({ messages })
  }

  return instance
}
