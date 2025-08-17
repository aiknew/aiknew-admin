import { useI18n, type Composer } from 'vue-i18n'

const messages = {
  en: {
    requestMethod: 'Request method',
    fillInUrl: 'Please fill in the URL',
    fillInMethod: 'Please fill in the request method',
    apiNameRequired: 'api name cannot be empty',
    apiNameLabel: 'Api Name',
    addTitle: 'Add API',
    editTitle: 'Edit API'
  },
  'zh-CN': {
    requestMethod: '请求方法',
    fillInUrl: '请填写URL',
    fillInMethod: '请填写请求方法',
    apiNameRequired: 'api名称不能为空',
    apiNameLabel: 'api名称',
    addTitle: '新增API',
    editTitle: '编辑 API'
  },
  'zh-TW': {
    requestMethod: '請求方法',
    fillInUrl: '請填寫URL',
    fillInMethod: '請填寫請求方法',
    apiNameRequired: 'api名稱不能為空',
    apiNameLabel: 'api名稱',
    addTitle: '新增API',
    editTitle: '编辑 API'
  }
}

let instance: Composer<typeof messages>

export const useAdminApiI18n = () => {
  if (!instance) {
    instance = useI18n({ messages })
  }

  return instance
}
