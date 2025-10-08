<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import { useAppForm, type Fields } from '@aiknew/shared-ui-components'
import { useAdminUserCreate, useAdminUserUpdate, type AdminUser } from '@/api/admin-user'
import { useAuthRoleAll, type AuthRole } from '@/api/auth-role'
import { tField } from '@aiknew/shared-ui-locales'
import { useI18n } from 'vue-i18n'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const { t } = useI18n()
const modalRef = useTemplateRef('modalRef')
const editId = ref('')
const { mutateAsync: createUser } = useAdminUserCreate()
const { mutateAsync: updateUser } = useAdminUserUpdate()
const { data: adminRoles } = useAuthRoleAll()
const inputPassword = ref<string | undefined>('')

const { AppForm, formApi } = useAppForm({
  fields: () =>
    [
      {
        as: 'ElInput',
        label: t('adminUser.userName'),
        name: 'userName',
        schema: () =>
          z
            .string({ error: t('adminUser.userNameRequired') })
            .nonempty({ error: t('adminUser.userNameRequired') })
      },
      {
        as: 'ElInput',
        label: t('adminUser.password'),
        name: 'password',
        schema: () => {
          if (modalRef.value?.modalMode === 'add') {
            return z
              .string({ error: t('adminUser.passwordRequired') })
              .min(1, { error: t('adminUser.passwordRequired') })
          }

          return z
            .string({ error: t('adminUser.passwordRequired') })
            .optional()
            .or(z.literal(''))
        }
      },
      {
        as: 'ElInput',
        label: t('adminUser.passwordConfirm'),
        name: 'passwordConfirm',
        schema: () => {
          if (modalRef.value?.modalMode === 'add' || inputPassword.value) {
            return z
              .string({ error: t('adminUser.passwordConfirmErr') })
              .min(1, { error: t('adminUser.passwordConfirmErr') })
              .refine(
                (val) => {
                  return val === inputPassword.value
                },
                {
                  error: t('adminUser.passwordConfirmErr')
                }
              )
          }

          return z
            .string({ error: t('adminUser.passwordConfirmErr') })
            .refine(
              (val) => {
                return val === inputPassword.value
              },
              {
                error: t('adminUser.passwordConfirmErr')
              }
            )
            .optional()
            .or(z.literal(''))
        }
      },
      {
        as: {
          component: 'ElTreeSelect',
          props: {
            style: { width: '200px' },
            multiple: true,
            valueKey: 'id',
            nodeKey: 'id',
            props: {
              label: (data: AuthRole) => {
                return tField(data.translations, 'roleName').value
              }
            },
            data: adminRoles.value
          }
        },
        label: t('adminUser.roles'),
        name: 'roles',
        schema: z.array(z.string()).default([]).optional()
      }
    ] as const satisfies Fields,
  async onSubmit({ values }) {
    if (modalRef.value?.modalMode === 'add') {
      if (typeof values.password === 'string') {
        await createUser({ ...values, password: values.password })
      }
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateUser({ id: editId.value, body: values })
    }

    emit('submit')
    handleReset()
  }
})

formApi.useStore((state) => {
  inputPassword.value = state.values.password
})

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('adminUser.addTitle'))
}

const edit = (item: AdminUser) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('adminUser.editTitle'))
  modalRef.value?.show()

  formApi.resetI18nValues(
    {
      ...item,
      password: '',
      passwordConfirm: '',
      translations: []
    },
    { keepDefaultValues: true }
  )
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
