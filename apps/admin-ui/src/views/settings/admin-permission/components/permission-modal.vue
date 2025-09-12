<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { h, ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import { AppFormItemTips, buildI18nSchema, useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import {
  usePermissionCreate,
  usePermissionUpdate,
  type Permission,
  type PermissionGroup
} from '@/api/permission'
import { RequestMethod } from '@aiknew/shared-enums'
import { usePermissionGroupAll } from '@/api/permission-group'
import { tField } from '@aiknew/shared-ui-locales'
import { useI18n } from 'vue-i18n'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useI18n()
const modalRef = useTemplateRef('modalRef')
const editId = ref('')

const { data: permissionGroups } = usePermissionGroupAll()
const { mutateAsync: createPermission } = usePermissionCreate()
const { mutateAsync: updatePermission } = usePermissionUpdate()

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
              { label: 'GET', value: 'GET' },
              { label: 'POST', value: 'POST' },
              { label: 'PATCH', value: 'PATCH' },
              { label: 'PUT', value: 'PUT' },
              { label: 'DELETE', value: 'DELETE' }
            ]
          }
        },
        label: t('adminPermission.requestMethod'),
        name: 'method',
        schema: z.enum(RequestMethod).nullable().optional().default(null).optional()
      },
      {
        as: 'ElInput',
        name: 'key',
        label: t('adminPermission.permissionKey'),
        schema: z.string().default('')
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            valueKey: 'id',
            nodeKey: 'id',
            style: { minWidth: '200px' },
            data: permissionGroups.value,
            props: {
              label: (data: PermissionGroup) => tField(data.translations, 'groupName').value,
              value: 'id'
            }
          }
        },
        name: 'groupId',
        label: t('adminPermission.permissionGroup'),
        schema: z.string().nullable().default(null)
      },
      {
        as: 'ElInput',
        label: t('adminPermission.path'),
        name: 'path',
        schema: z.string().optional().nullable().default(null).optional()
      },
      {
        as: 'ElInput',
        label: t('adminPermission.permissionNameLabel'),
        name: 'permissionName',
        i18n: true,
        schema: buildI18nSchema(z.string().nonempty().default(''), languages)
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
      await createPermission(i18nValues)
    } else if (modalRef.value?.modalMode === 'edit') {
      await updatePermission({ id: editId.value, body: i18nValues })
    }

    emit('submit')
    handleReset()
  }
})

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('adminPermission.addPermission'))
}

const edit = (item: Permission) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('adminPermission.editPermission'))
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
