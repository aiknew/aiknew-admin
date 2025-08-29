<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { h, computed, useTemplateRef, ref } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useAuthRouteI18n } from '../composables/use-auth-route-i18n'
import { useAuthRouteCreate, useAuthRouteUpdate, type AuthRoute } from '@/api/auth-route'
import { type AuthApi } from '@/api/auth-api'
import { useAuthRouteApiData } from '../composables/use-auth-route-api-data'
import { useUpdatedParentIds } from '@/composables/tree-data/use-updated-parent-ids'
import { useAuthRouteData } from '../composables/use-auth-route-data'
import { tField } from '@aiknew/shared-ui-locales'

interface Emits {
  (e: 'submit', info: { updatedParentIds: string[] }): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const modalRef = useTemplateRef('modalRef')
const langStore = useLangStore()
const { t } = useAuthRouteI18n()
const { addUpdatedParentId, getUpdatedParentIds } = useUpdatedParentIds()
const { defaultExpandedApiKeys, setSelectedApiKeys, fetchApiAncestors, loadApiNode } =
  useAuthRouteApiData()
const {
  editRouteId,
  // parentRouteId,
  defaultExpandedRouteKeys,
  setEditRouteId,
  fetchRouteAncestors,
  loadNode
} = useAuthRouteData()

const isMenu = ref(true)
const isButton = ref(false)
const isSmallGroup = ref(false)

const { mutateAsync: createRoute } = useAuthRouteCreate()
const { mutateAsync: updateRoute } = useAuthRouteUpdate()

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: {
          component: 'ElRadio',
          props: {
            options: [
              { label: t('routeTypeMenu'), value: 'MENU' },
              { label: t('routeTypeButton'), value: 'BUTTON' },
              { label: t('routeTypeGroup'), value: 'GROUP' },
              { label: t('routeTypeSmallGroup'), value: 'SMALL_GROUP' }
            ]
          }
        },
        label: t('routeType'),
        name: 'type',
        schema: z
          .union([
            z.literal('MENU'),
            z.literal('BUTTON'),
            z.literal('GROUP'),
            z.literal('SMALL_GROUP')
          ])
          .default('MENU')
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            style: { width: '200px' },
            valueKey: 'id',
            nodeKey: 'id',
            lazy: true,
            checkStrictly: true,
            defaultExpandedKeys: defaultExpandedRouteKeys.value,
            props: {
              label: (data: AuthRoute) => tField(data.translations, 'routeName').value,
              disabled: (data: AuthRoute) => {
                return data.id === editRouteId.value && data.id !== '0'
              },
              isLeaf: (data: AuthRoute) => {
                return data.id === editRouteId.value && data.id !== '0'
              }
            },
            load: loadNode
          }
        },
        label: t('parent'),
        name: 'parentId',
        schema: z.string().default('0')
      },
      {
        when: computed(() => !(isButton.value || isSmallGroup.value)),
        as: 'ElInput',
        label: t('iconLabel'),
        name: 'icon',
        schema: z.string().default('').optional()
      },
      {
        when: isMenu,
        as: 'ElInput',
        label: t('redirectLabel'),
        name: 'redirect',
        schema: z.string().default('').optional()
      },
      {
        when: () => !isButton.value,
        as: 'ElSwitch',
        label: t('hiddenLabel'),
        name: 'hidden',
        schema: z.boolean().default(false),
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('hiddenTips') })
        }
      },
      {
        when: isMenu,
        as: {
          component: 'ElInput',
          slots: {
            prepend() {
              return [h('div', '@/views/')]
            },
            append() {
              return [h('div', '.vue')]
            }
          }
        },
        label: t('componentLabel'),
        name: 'component',
        schema: z.string().nonempty().default(''),
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('componentTips') })
        }
      },
      {
        when: isMenu,
        as: 'ElSwitch',
        label: t('statusLabel'),
        name: 'status',
        schema: z.boolean().default(false),
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('statusTips') })
        }
      },
      {
        when: isMenu,
        as: 'ElInput',
        label: t('pathLabel'),
        name: 'path',
        schema: z.string().nonempty().default('')
      },
      {
        when: isButton,
        as: 'ElInput',
        label: t('keyLabel'),
        name: 'key',
        schema: z.string().nonempty().default(''),
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('keyTips') })
        }
      },

      {
        when: () => isMenu.value || isButton.value,
        as: {
          component: 'ElTreeSelect',
          props: {
            style: { width: '200px' },
            multiple: true,
            valueKey: 'id',
            nodeKey: 'id',
            lazy: true,
            checkStrictly: true,
            defaultExpandedKeys: defaultExpandedApiKeys.value,
            props: {
              label: (data: AuthApi) => tField(data.translations, 'apiName').value
            },
            load: loadApiNode
          }
        },
        label: t('apiLabel'),
        name: 'apis',
        schema: z.array(z.string()).nonempty().default([])
      },

      {
        as: 'ElInput',
        label: t('routeNameLabel'),
        name: 'routeName',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
        // rules: langStore.buildTranslationSchema(
        //   z.string({ message: 'translationRequired' }).nonempty({ message: 'translationRequired' })
        // )
      },
      {
        as: 'ElInputNumber',
        label: t('order'),
        name: 'order',
        container: {
          bottomSlot: h(AppFormItemTips, { text: t('orderTips') })
        },
        schema: z.number().default(10)
      }
    ] as const satisfies Fields,
  async onSubmit({ i18nValues }) {
    if (modalRef.value?.modalMode === 'add') {
      await createRoute(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateRoute({ id: editRouteId.value, body: i18nValues })
    }

    addUpdatedParentId(i18nValues.parentId)

    emit('submit', {
      updatedParentIds: getUpdatedParentIds()
    })
    handleReset()
  }
})

formApi.useStore((state) => {
  isButton.value = state.values.type === 'BUTTON'
  isMenu.value = state.values.type === 'MENU'
  isSmallGroup.value = state.values.type === 'SMALL_GROUP'
})

const add = async () => {
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addTitle'))
  modalRef.value?.show()
}

const edit = async (item: AuthRoute) => {
  setEditRouteId(item.id)
  addUpdatedParentId(item.parentId)

  setSelectedApiKeys(item.apis)
  fetchApiAncestors()
  fetchRouteAncestors()

  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editTitle'))
  modalRef.value?.show()
  formApi.resetI18nValues(item, { keepDefaultValues: true })
}

const handleReset = () => {
  modalRef.value?.close()
  formApi.reset()
  emit('close')
}

defineExpose({
  add,
  edit
})
</script>

<template>
  <AppBasicModal ref="modalRef" @submit="formApi.handleSubmit" @close="handleReset">
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
