<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, h, useTemplateRef, computed } from 'vue'
import { z } from 'zod'
import {
  AppFormItemTips,
  buildI18nSchema,
  useAppForm,
  type Fields
} from '@aiknew/shared-ui-components'
import { useLangStore } from '@/stores/lang'
import { useAuthRoleCreate, useAuthRoleUpdate, type AuthRole } from '@/api/auth-role'
import { useAuthRouteAll, type AuthRoute } from '@/api/auth-route'
import { tField } from '@aiknew/shared-ui-locales'
import { buildTree } from '@aiknew/shared-utils'
import { useI18n } from 'vue-i18n'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const modalRef = useTemplateRef('modalRef')
const langStore = useLangStore()
const { t } = useI18n()
const { data: routes } = useAuthRouteAll()
const { mutateAsync: createRole } = useAuthRoleCreate()
const { mutateAsync: updateRole } = useAuthRoleUpdate()
const editId = ref('0')
const routesTree = computed(() => {
  return buildTree(routes.value, 'id', 'parentId')
})

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: 'ElInput',
        label: t('authRole.roleNameLabel'),
        name: 'roleName',
        i18n: true,
        schema: () =>
          buildI18nSchema(
            z
              .string()
              .nonempty({
                error: t('authRole.roleNameRequired')
              })
              .default(''),
            languages
          )
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            style: { minWidth: '200px' },
            multiple: true,
            valueKey: 'id',
            nodeKey: 'id',
            checkStrictly: true,
            data: routesTree.value,
            props: {
              label: (data: AuthRoute) => tField(data.translations, 'routeName').value
            }
          }
        },
        label: t('authRole.permissionsLabel'),
        name: 'routes',
        schema: z.array(z.string()).default([]).optional()
      },
      {
        as: 'ElInputNumber',
        label: t('order'),
        name: 'order',
        container: {
          bottomSlot() {
            return h(AppFormItemTips, { text: t('orderTips') })
          }
        },
        schema: z.number().default(10)
      }
    ] as const satisfies Fields,
  async onSubmit({ i18nValues }) {
    if (modalRef.value?.modalMode === 'add') {
      await createRole({
        ...i18nValues,
        routes: i18nValues.routes ?? []
      })
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateRole({ id: editId.value, body: i18nValues })
    }

    emit('submit')
    handleReset()
  }
})

const add = () => {
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('authRole.addTitle'))
  modalRef.value?.show()
}

const edit = (item: AuthRole) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('authRole.editTitle'))
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
