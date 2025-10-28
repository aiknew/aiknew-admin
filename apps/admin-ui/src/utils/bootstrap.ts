import type { App } from "vue"
import { createPinia } from "pinia"
import { VueQueryPlugin } from "@tanstack/vue-query"
import router from "../router"
import { installI18n } from "@aiknew/shared-ui-locales"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import { HttpError } from "./openapi-fetch-client"
import type { components } from "@/types/open-api"
import { ElLoading } from "element-plus"
import { useUserStore } from "@/stores/user"
import { registerDirectives } from "@/directives"
import { useThemeSettingStore } from "../stores/index"

export const bootstrap = (app: App<Element>) => {
  // install vue-i18n
  installI18n(app)

  // install pinia
  app.use(createPinia())

  // register routes
  const { registerRoutes } = useUserStore()
  registerRoutes()

  // restore user selected themes
  const { restoreThemeColors } = useThemeSettingStore()
  restoreThemeColors()

  // install vue router
  app.use(router)

  // install vue query
  VueQueryPlugin.install(app, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          retry(failureCount, error) {
            if (error instanceof HttpError) {
              const shouldNotRetryCodes: components["schemas"]["ResponseStatusCode"][] =
                [401, 403, 400]
              if (shouldNotRetryCodes.includes(error.data.code)) {
                return false
              }
            }

            return failureCount < 3
          },
        },
      },
    },
  })

  // register element-plus icons
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  // register element-plus loading directive
  app.directive("loading", ElLoading.directive)

  // register custom directives
  registerDirectives(app)
}
