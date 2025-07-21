import { currentLang, t } from '@aiknew/shared-ui-locales'
import { useUserStore } from '@/stores/user'
import { type paths } from '@/types/open-api'
import type { IResponseJson } from '@aiknew/shared-types'
import { ElMessage, ElNotification } from 'element-plus'
import createClient, { type Middleware } from 'openapi-fetch'

/**
 * A custom Error with extra information
 */
export class HttpError extends Error {
  data: IResponseJson

  constructor(data: IResponseJson, message?: string) {
    super(data.msg || message)
    this.data = data
  }
}

const fetchClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL
})

const middleware: Middleware = {
  async onRequest({ request }) {
    // set current language
    request.headers.set('accept-language', currentLang.value)
    // set user access token
    const userStore = useUserStore()
    if (userStore.accessToken) {
      request.headers.set('Authorization', `Bearer ${userStore.accessToken}`)
    }

    return request
  },
  async onResponse({ response, request }) {
    if (!response.ok) {
      // Non 200~299 response
      if (response.status === 401) {
        // logout
        const userStore = useUserStore()
        userStore.logout()
      }

      if (response.status === 403) {
        // update permissions
        // const userStore = useUserStore()
        // userStore.updateUserInfo()
      }
    } else {
      // 200~299 response
      const body: IResponseJson = await response.clone().json()
      const showMsg = request.showMsg ?? true
      if (showMsg) {
        ElMessage({
          message: body.msg,
          type: 'success'
        })
      }
    }

    return response
  },
  onError({ error }) {
    // Network Error
    ElNotification({
      title: t('networkError'),
      message: String(error),
      type: 'error'
    })
  }
}

fetchClient.use(middleware)

export { fetchClient }
