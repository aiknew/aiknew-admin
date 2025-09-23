import AdminEditor from "@/components/editor/admin-editor.vue";
import AdminFileSelect from "@/components/file/admin-file-select.vue";
import { useAppForm, components, type ComponentPropsAndSlots } from "@aiknew/shared-ui-components";

// Install business-specific components
Object.assign(components, {
  AdminFileSelect,
  AdminEditor
})

// Extend Components Interface
declare module '@aiknew/shared-ui-components' {
  interface ExtraComponents {
    AdminFileSelect: ComponentPropsAndSlots<typeof AdminFileSelect>
    AdminEditor: ComponentPropsAndSlots<typeof AdminEditor>
  }
}

// Reexport use hooks
export const useAdminForm = useAppForm
