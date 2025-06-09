import type { App } from 'vue'
import { permissionDirective } from './permission'

export const registerDirectives = (app: App<Element>) => {
  app.directive('permission', permissionDirective)
}
