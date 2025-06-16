import { useI18n } from 'vue-i18n'

export const useAdminUserI18n = () => {
  const { t } = useI18n({
    messages: {
      en: {
        addTitle: 'Add Administrator',
        editTitle: 'Edit Administrator',
        userName: 'Administrator Name',
        password: 'Password',
        passwordConfirm: 'Confirm Password',
        roles: 'Roles and Permissions',
        passwordConfirmErr: 'The passwords are inconsistent twice',
        userNameRequired: 'Please enter the administrator name',
        passwordRequired: 'Please enter the administrator password'
      },
      'zh-CN': {
        addTitle: '新增管理员',
        editTitle: '编辑管理员',
        userName: '管理员名称',
        password: '密码',
        passwordConfirm: '确认密码',
        roles: '角色权限',
        passwordConfirmErr: '两次密码不一致',
        userNameRequired: '请输入管理员名称',
        passwordRequired: '请输入管理员密码'
      },
      'zh-TW': {
        addTitle: '新增管理員',
        editTitle: '編輯管理員',
        userName: '管理員名稱',
        password: '密碼',
        passwordConfirm: '確認密碼',
        roles: '角色權限',
        passwordConfirmErr: '兩次密碼不一致',
        userNameRequired: '請輸入管理員名稱',
        passwordRequired: '請輸入管理員密碼'
      }
    }
  })

  return {
    t
  }
}
