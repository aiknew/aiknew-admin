<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, nextTick, h, computed, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppForm, makeFields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useAdminRoleI18n } from '../composables/use-admin-role-i18n'
import { useAdminRoleCreate, useAdminRoleUpdate, type AdminRole } from '@/api/admin-role'
import { useAdminRouteChildren, type AuthRoute, type AuthRouteAncestorsDto } from '@/api/auth-route'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { useAdminRoleRouteData } from '../composables/use-admin-role-route-data'
import { tField } from '@aiknew/shared-ui-locales'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const modalRef = useTemplateRef('modalRef')
const langStore = useLangStore()
const { t } = useAdminRoleI18n()
const appFormRef = useTemplateRef('appFormRef')
const { mutateAsync: createRole } = useAdminRoleCreate()
const { mutateAsync: updateRole } = useAdminRoleUpdate()
const editId = ref('0')
const { defaultExpandedKeys, setSelectedKeys, fetchRouteAncestors, loadNode } =
  useAdminRoleRouteData()

const fields = makeFields(
  {
    as: 'ElInput',
    label: 'roleNameLabel',
    name: 'roleName',
    translation: true,
    rules: langStore.buildTranslationSchema(
      z.string().nonempty({ message: 'translationRequired' }),
      ''
    )
  },
  {
    as: 'ElTreeSelect',
    label: 'permissionsLabel',
    name: 'routes',
    rules: z.array(z.string()),
    attrs: {
      multiple: true,
      valueKey: 'id',
      nodeKey: 'id',
      lazy: true,
      checkStrictly: true,
      defaultExpandedKeys,
      props: {
        label: (data: AuthRoute) => tField(data.translations, 'routeName').value
      },
      load: loadNode
    }
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

const handleSubmit = () => {
  appFormRef.value?.submit().then(async (values) => {
    if (modalRef.value?.modalMode === 'add') {
      await createRole(values)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateRole({ id: editId.value, body: values })
    }

    emit('submit')
    handleReset()
  })
}

const add = () => {
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addTitle'))
  modalRef.value?.show()
}

const edit = (item: AdminRole) => {
  editId.value = item.id

  setSelectedKeys(item.routes)
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
