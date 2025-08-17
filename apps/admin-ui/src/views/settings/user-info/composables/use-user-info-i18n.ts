import { useI18n, type Composer } from 'vue-i18n'

const messages = {
  en: {
    userName: 'Username',
    password: 'Password',
    newPassword: 'New Password',
    newPasswordConfirm: 'Confirm New Password'
  },
  'zh-CN': {
    userName: '管理员名称',
    password: '原密码',
    newPassword: '新密码',
    newPasswordConfirm: '确认新密码'
  },
  'zh-TW': {
    userName: '管理員名稱',
    password: '原密碼',
    newPassword: '新密碼',
    newPasswordConfirm: '確認新密碼'
  }
}

let instance: Composer<typeof messages>

export const useUserInfoI18n = () => {
  if (!instance) {
    instance = useI18n({ messages })
  }

  return instance
}
