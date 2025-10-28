import type AdminEditor from "@/components/editor/admin-editor.vue"
import type AdminFileSelect from "@/components/file/admin-file-select.vue"
import {
  useAppForm,
  components,
  type ComponentPropsAndSlots,
} from "@aiknew/shared-ui-components"
import { defineAsyncComponent } from "vue"

// Install business-specific components
Object.assign(components, {
  AdminFileSelect: defineAsyncComponent(
    () => import("@/components/file/admin-file-select.vue"),
  ),
  AdminEditor: defineAsyncComponent(
    () => import("@/components/editor/admin-editor.vue"),
  ),
})

// Extend Components Interface
declare module "@aiknew/shared-ui-components" {
  interface ExtraComponents {
    AdminFileSelect: ComponentPropsAndSlots<typeof AdminFileSelect>
    AdminEditor: ComponentPropsAndSlots<typeof AdminEditor>
  }
}

// Reexport use hooks
export const useAdminForm = useAppForm
