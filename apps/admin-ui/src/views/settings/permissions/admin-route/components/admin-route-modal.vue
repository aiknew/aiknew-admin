<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, nextTick, h, computed, useTemplateRef, type ComputedRef } from 'vue'
import { z } from 'zod'
import { AppForm, AppFormItemTips, makeFields, type Field } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useAdminRouteI18n } from '../composables/use-admin-route-i18n'
import type Node from 'element-plus/es/components/tree/src/model/node'
import {
  useAdminRouteAncestors,
  useAdminRouteChildren,
  useAdminRouteCreate,
  useAdminRouteUpdate,
  type AdminRoute,
  type AdminRouteAncestorsDto,
  type RouteType
} from '@/api/admin-route'
import { useAdminApiChildren, useAdminApisAncestors, type AdminApi } from '@/api/admin-api'
import { useAdminRouteApiData } from '../composables/use-admin-route-api-data'
import { useUpdatedParentIds } from '@/composables/tree-data/use-updated-parent-ids'
import { useAdminRouteData } from '../composables/use-admin-route-data'
import { tField } from '@aiknew/shared-ui-locales'

interface Emits {
  (e: 'submit', info: { updatedParentIds: string[] }): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const appFormRef = useTemplateRef('appFormRef')
const modalRef = useTemplateRef('modalRef')
const langStore = useLangStore()
const { t } = useAdminRouteI18n()
const { addUpdatedParentId, getUpdatedParentIds } = useUpdatedParentIds()
const { defaultExpandedApiKeys, setSelectedApiKeys, fetchApiAncestors, loadApiNode } =
  useAdminRouteApiData()
const {
  editRouteId,
  parentRouteId,
  defaultExpandedRouteKeys,
  setEditRouteId,
  fetchRouteAncestors,
  loadNode
} = useAdminRouteData()

const isMenu = computed<boolean>(
  () => appFormRef.value?.values['type'] === 'MENU'
) as ComputedRef<boolean>

const isButton = computed<boolean>(
  () => appFormRef.value?.values['type'] === 'BUTTON'
) as ComputedRef<boolean>

const isSmallGroup = computed<boolean>(
  () => appFormRef.value?.values['type'] === 'SMALL_GROUP'
) as ComputedRef<boolean>

const fields = makeFields(
  {
    as: 'ElRadio',
    label: 'routeType',
    name: 'type',
    rules: z
      .union([z.literal('MENU'), z.literal('BUTTON'), z.literal('GROUP'), z.literal('SMALL_GROUP')])
      .default('MENU'),
    options: [
      { label: 'routeTypeMenu', value: 'MENU' },
      { label: 'routeTypeButton', value: 'BUTTON' },
      { label: 'routeTypeGroup', value: 'GROUP' },
      { label: 'routeTypeSmallGroup', value: 'SMALL_GROUP' }
    ]
  },
  {
    as: 'ElTreeSelect',
    label: 'parent',
    name: 'parentId',
    rules: z.string().default('0'),
    attrs: {
      valueKey: 'id',
      nodeKey: 'id',
      lazy: true,
      checkStrictly: true,
      defaultExpandedKeys: defaultExpandedRouteKeys,
      props: {
        label: (data: AdminRoute) => tField(data.translations, 'routeName').value,
        disabled: (data: AdminRoute) => {
          return data.id === editRouteId.value && data.id !== '0'
        },
        isLeaf: (data: AdminRoute) => {
          return data.id === editRouteId.value && data.id !== '0'
        }
      },
      load: loadNode
    }
  },
  {
    enabled: computed(() => !(isButton.value || isSmallGroup.value)),
    as: 'ElInput',
    label: 'iconLabel',
    name: 'icon',
    rules: z.string().nonempty()
  },
  {
    enabled: isMenu,
    as: 'ElInput',
    label: 'redirectLabel',
    name: 'redirect',
    rules: z.string().optional()
  },
  {
    enabled: () => !isButton.value,
    as: 'ElSwitch',
    label: 'hiddenLabel',
    name: 'hidden',
    rules: z.boolean().default(false),
    formItemSlots: {
      default() {
        return [h(AppFormItemTips, { text: t('hiddenTips') })]
      }
    }
  },
  {
    enabled: isMenu,
    as: 'ElInput',
    label: 'componentLabel',
    name: 'component',
    rules: z.string().nonempty(),
    attrs: {
      slots: {
        prepend() {
          return [h('div', '@/views/')]
        },
        append() {
          return [h('div', '.vue')]
        }
      }
    },
    formItemSlots: {
      default() {
        return [h(AppFormItemTips, { text: t('componentTips') })]
      }
    }
  },
  {
    enabled: isMenu,
    as: 'ElSwitch',
    label: 'statusLabel',
    name: 'status',
    rules: z.boolean().default(false),
    formItemSlots: {
      default() {
        return [h(AppFormItemTips, { text: t('statusTips') })]
      }
    }
  },
  {
    enabled: isMenu,
    as: 'ElInput',
    label: 'pathLabel',
    name: 'path',
    rules: z.string().nonempty()
  },
  {
    enabled: isButton,
    as: 'ElInput',
    label: 'keyLabel',
    name: 'key',
    rules: z.string().nonempty(),
    formItemSlots: {
      default() {
        return [h('div', { class: ['w-full'] }, t('keyTips'))]
      }
    }
  },

  {
    enabled: () => isMenu.value || isButton.value,
    as: 'ElTreeSelect',
    label: 'apiLabel',
    name: 'apis',
    rules: z.array(z.string()).nonempty(),
    attrs: {
      multiple: true,
      valueKey: 'id',
      nodeKey: 'id',
      lazy: true,
      checkStrictly: true,
      defaultExpandedKeys: defaultExpandedApiKeys,
      props: {
        label: (data: AdminApi) => tField(data.translations, 'apiName').value
      },
      load: loadApiNode
    }
  },

  {
    as: 'ElInput',
    label: 'routeNameLabel',
    name: 'routeName',
    translation: true,
    rules: langStore.buildTranslationSchema(
      z.string({ message: 'translationRequired' }).nonempty({ message: 'translationRequired' })
    )
  },
  {
    as: 'ElInputNumber',
    label: 'order',
    name: 'order',
    formItemSlots: {
      default() {
        return [h('div', { class: ['w-full'] }, t('orderTips'))]
      }
    },
    rules: z.number().default(10)
  }
)

const { mutateAsync: createRoute } = useAdminRouteCreate()
const { mutateAsync: updateRoute } = useAdminRouteUpdate()

const handleSubmit = () => {
  appFormRef.value
    ?.submit()
    .then(async (values) => {
      console.log('submit: ', values)
      if (modalRef.value?.modalMode === 'add') {
        await createRoute(values)
      } else if (modalRef.value?.modalMode === 'edit') {
        await updateRoute({ id: editRouteId.value, body: values })
      }

      addUpdatedParentId(values.parentId)

      emit('submit', {
        updatedParentIds: getUpdatedParentIds()
      })
      handleReset()
    })
    .catch((err) => {
      console.log('err: ', err)
    })
}

const add = async () => {
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addTitle'))
  modalRef.value?.show()
}

const edit = async (item: AdminRoute) => {
  setEditRouteId(item.id)
  addUpdatedParentId(item.parentId)

  setSelectedApiKeys(item.apis)
  fetchApiAncestors()
  fetchRouteAncestors()

  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editTitle'))
  modalRef.value?.show()
  nextTick(() => {
    appFormRef.value?.setFormVals(item)
  })
}

const handleReset = () => {
  modalRef.value?.close()
  appFormRef.value?.reset()
  emit('close')
}

defineExpose({
  add,
  edit
})
</script>

<template>
  <AppBasicModal ref="modalRef" @submit="handleSubmit" @close="handleReset">
    <AppForm ref="appFormRef" :t :fields :languages="langStore.enabledLangs" />
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
