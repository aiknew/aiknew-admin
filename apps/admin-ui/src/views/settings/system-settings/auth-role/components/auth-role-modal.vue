<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, h, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useAuthRoleI18n } from '../composables/use-auth-role-i18n'
import { useAuthRoleCreate, useAuthRoleUpdate, type AuthRole } from '@/api/auth-role'
import { type AuthRoute } from '@/api/auth-route'
import { useAuthRoleRouteData } from '../composables/use-auth-role-route-data'
import { tField } from '@aiknew/shared-ui-locales'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const modalRef = useTemplateRef('modalRef')
const langStore = useLangStore()
const { t } = useAuthRoleI18n()
const { mutateAsync: createRole } = useAuthRoleCreate()
const { mutateAsync: updateRole } = useAuthRoleUpdate()
const editId = ref('0')
const { defaultExpandedKeys, setSelectedKeys, fetchRouteAncestors, loadNode } =
  useAuthRoleRouteData()

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAppForm({
  languages,
  fields: () =>
    [
      {
        as: 'ElInput',
        label: t('roleNameLabel'),
        name: 'roleName',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
        // rules: langStore.buildTranslationSchema(
        //   z.string().nonempty({ message: 'translationRequired' }),
        //   ''
        // )
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            multiple: true,
            valueKey: 'id',
            nodeKey: 'id',
            lazy: true,
            checkStrictly: true,
            defaultExpandedKeys: defaultExpandedKeys.value,
            props: {
              label: (data: AuthRoute) => tField(data.translations, 'routeName').value
            },
            load: loadNode
          }
        },
        label: t('permissionsLabel'),
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
  modalRef.value?.setTitle(t('addTitle'))
  modalRef.value?.show()
}

const edit = (item: AuthRole) => {
  editId.value = item.id

  setSelectedKeys(item.routes)
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
