<script lang="ts" setup>
import { AppBasicModal } from "@aiknew/shared-ui-components"
import { h, computed, useTemplateRef, ref, onMounted } from "vue"
import { z } from "zod"
import {
  AppFormItemTips,
  buildI18nSchema,
  useAppForm,
  type Fields,
} from "@aiknew/shared-ui-components"
import { useLangStore } from "@/stores/lang"
import {
  useAuthRouteCreate,
  useAuthRouteUpdate,
  type AuthRoute,
} from "@/api/auth-route"
import { usePermissionAll, type Permission } from "@/api/permission"
import { tField } from "@aiknew/shared-ui-locales"
import type { TreeList } from "@aiknew/shared-ui-types"
import { useI18n } from "vue-i18n"
import SelectIcon from "./select-icon.vue"
import { RouteType } from "@aiknew/shared-enums"

interface Props {
  routes?: TreeList<AuthRoute>
}

interface Emits {
  (e: "submit"): void
  (e: "close"): void
}

const emit = defineEmits<Emits>()
const { routes } = defineProps<Props>()
const modalRef = useTemplateRef("modalRef")
const langStore = useLangStore()
const { t } = useI18n()
const { data: permissions, refetch: getAllApis } = usePermissionAll()
const editRoute = ref<AuthRoute>()

const showIcons = ref(false)
const selectedIcon = ref("")
const isMenu = ref(true)
const isButton = ref(false)
const isSmallGroup = ref(false)

const { mutateAsync: createRoute } = useAuthRouteCreate()
const { mutateAsync: updateRoute } = useAuthRouteUpdate()

onMounted(() => {
  getAllApis()
})

const setType = (type: AuthRoute["type"]) => {
  isButton.value = type === "BUTTON"
  isMenu.value = type === "MENU"
  isSmallGroup.value = type === "SMALL_GROUP"
}

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: {
          component: "ElRadio",
          props: {
            options: [
              { label: t("authRoute.routeTypeMenu"), value: "MENU" },
              { label: t("authRoute.routeTypeButton"), value: "BUTTON" },
              { label: t("authRoute.routeTypeGroup"), value: "GROUP" },
              {
                label: t("authRoute.routeTypeSmallGroup"),
                value: "SMALL_GROUP",
              },
            ],
            onChange(val: RouteType) {
              setType(val)
            },
          },
        },
        label: t("authRoute.routeType"),
        name: "type",
        schema: z.enum(RouteType).default("MENU"),
      },
      {
        as: {
          component: "ElTreeSelect",
          props: {
            placeholder: t("selectParent"),
            clearable: true,
            style: { minWidth: "260px" },
            valueKey: "id",
            nodeKey: "id",
            checkStrictly: true,
            data: routes,
            props: {
              label: (data: AuthRoute) =>
                tField(data.translations, "routeName").value,
            },
          },
        },
        label: t("parent"),
        name: "parentId",
        schema: z.string().optional().nullable().default(null),
      },
      {
        when: computed(() => !(isButton.value || isSmallGroup.value)),
        as: {
          component: "ElInput",
          props: {
            modelValue: selectedIcon.value,
            "onUpdate:modelValue": (val: string) => {
              selectedIcon.value = val
            },
            clearable: true,
            prefixIcon: selectedIcon.value,
            onFocus() {
              showIcons.value = true
            },
            onBlur() {
              showIcons.value = false
            },
          },
        },
        label: t("authRoute.iconLabel"),
        name: "icon",
        container: {
          bottomSlot: h(SelectIcon, {
            visible: showIcons.value,
            onSelect(icon) {
              selectedIcon.value = icon
            },
          }),
        },
        schema: z.string().default("").optional(),
      },
      {
        when: isMenu,
        as: "ElInput",
        label: t("authRoute.redirectLabel"),
        name: "redirect",
        schema: z.string().default("").optional(),
      },
      {
        when: () => !isButton.value,
        as: "ElSwitch",
        label: t("authRoute.hiddenLabel"),
        name: "hidden",
        schema: z.boolean().default(false),
        container: {
          bottomSlot: h(AppFormItemTips, { text: t("authRoute.hiddenTips") }),
        },
      },
      {
        when: isMenu,
        as: {
          component: "ElInput",
          slots: {
            prepend() {
              return [h("div", "@/views/")]
            },
            append() {
              return [h("div", ".vue")]
            },
          },
        },
        label: t("authRoute.componentLabel"),
        name: "component",
        schema: () =>
          z
            .string()
            .nonempty({
              error: t("authRoute.componentRequired"),
            })
            .default(""),
        container: {
          bottomSlot: h(AppFormItemTips, {
            text: t("authRoute.componentTips"),
          }),
        },
      },
      {
        when: isMenu,
        as: "ElSwitch",
        label: t("authRoute.statusLabel"),
        name: "status",
        schema: z.boolean().default(true),
        container: {
          bottomSlot: h(AppFormItemTips, { text: t("authRoute.statusTips") }),
        },
      },
      {
        when: isMenu,
        as: "ElInput",
        label: t("authRoute.pathLabel"),
        name: "path",
        schema: () =>
          z
            .string()
            .nonempty({
              error: t("authRoute.pathRequired"),
            })
            .default(""),
      },
      {
        when: isButton,
        as: "ElInput",
        label: t("authRoute.keyLabel"),
        name: "key",
        schema: () =>
          z
            .string({
              error: t("authRoute.keyRequired"),
            })
            .nonempty({
              error: t("authRoute.keyRequired"),
            })
            .default(""),
        container: {
          bottomSlot: h(AppFormItemTips, { text: t("authRoute.keyTips") }),
        },
      },

      {
        when: () => isMenu.value || isButton.value,
        as: {
          component: "ElTreeSelect",
          props: {
            style: { minWidth: "200px" },
            multiple: true,
            valueKey: "id",
            nodeKey: "id",
            props: {
              label: (data: Permission) => {
                return tField(data.translations, "permissionName").value
              },
            },
            data: computed(() => permissions.value ?? []).value,
          },
        },
        label: t("authRoute.permissions"),
        name: "permissions",
        schema: z.array(z.string()).optional().default([]).optional(),
      },

      {
        as: "ElInput",
        label: t("authRoute.routeNameLabel"),
        name: "routeName",
        i18n: true,
        schema: () =>
          buildI18nSchema(
            z
              .string()
              .nonempty({
                error: t("authRoute.routeNameRequired"),
              })
              .default(""),
            languages,
          ),
      },
      {
        as: "ElInputNumber",
        label: t("order"),
        name: "order",
        container: {
          bottomSlot: h(AppFormItemTips, { text: t("orderTips") }),
        },
        schema: z.number().default(10),
      },
    ] as const satisfies Fields,
  async onSubmit({ values }) {
    values.icon = selectedIcon.value
    if (values.parentId === undefined) {
      values.parentId = null
    }

    if (modalRef.value?.modalMode === "add") {
      await createRoute(values)
    } else if (modalRef.value?.modalMode === "edit" && editRoute.value) {
      await updateRoute({ id: editRoute.value.id, body: values })
    }

    emit("submit")
    handleReset()
  },
})

const add = async () => {
  modalRef.value?.setModalMode("add")
  modalRef.value?.setTitle(t("authRoute.addTitle"))
  modalRef.value?.show()
}

const setDisabled = (
  route: TreeList<AuthRoute>[number] | undefined,
  disabled: boolean,
) => {
  if (!route) return
  route.disabled = disabled
  if (route.children && route.children.length > 0) {
    route.children.forEach((item) => {
      setDisabled(item, disabled)
    })
  }
}

const edit = async (item: AuthRoute) => {
  setType(item.type)
  editRoute.value = item
  setDisabled(editRoute.value, true)
  modalRef.value?.setModalMode("edit")
  modalRef.value?.setTitle(t("authRoute.editTitle"))
  modalRef.value?.show()
  selectedIcon.value = item.icon

  formApi.resetI18nValues(item, { keepDefaultValues: true })
}

const handleReset = () => {
  selectedIcon.value = ""
  setDisabled(editRoute.value, false)
  modalRef.value?.close()
  formApi.reset()
  setType("MENU")
  emit("close")
}

defineExpose({
  add,
  edit,
})
</script>

<template>
  <AppBasicModal
    destroy-on-close
    ref="modalRef"
    @submit="formApi.handleSubmit"
    @close="handleReset"
  >
    <AppForm />
  </AppBasicModal>
</template>

<style>
.el-radio-button__inner {
  background: #f9f9f9;
  border: none;
}

.el-radio-button:first-child .el-radio-button__inner {
  border-left: none;
}
</style>
