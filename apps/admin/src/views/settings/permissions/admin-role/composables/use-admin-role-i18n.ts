import { useI18n } from 'vue-i18n'

export const useAdminRoleI18n = () => {
  const { t } = useI18n({
    messages: {
      en: {
        addTitle: 'Add Role',
        editTitle: 'Edit Role',
        roleNameLabel: 'Role name',
        permissionsLabel: 'Permission settings'
      },
      'zh-CN': {
        addTitle: '新增角色',
        editTitle: '编辑角色',
        roleNameLabel: '角色名称',
        permissionsLabel: '权限设置'
      },
      'zh-TW': {
        addTitle: '新增角色',
        editTitle: '编辑角色',
        roleNameLabel: '角色名稱',
        permissionsLabel: '權限設置'
      }
    }
  })

  return {
    t
  }
}
