<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, computed, useTemplateRef } from 'vue'
import { z } from 'zod'
import { useAppForm, type Fields } from '@aiknew/shared-ui-form'
import { useAdminUserI18n } from '../composables/use-admin-user-i18n'
import { useAdminUserCreate, useAdminUserUpdate, type AdminUser } from '@/api/admin-user'
import { useAuthRoleAll, type AuthRole } from '@/api/auth-role'
import { tField } from '@aiknew/shared-ui-locales'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const { t } = useAdminUserI18n()
const modalRef = useTemplateRef('modalRef')
const editId = ref('')
const { mutateAsync: createUser } = useAdminUserCreate()
const { mutateAsync: updateUser } = useAdminUserUpdate()
const { data: adminRoles } = useAuthRoleAll()
const inputPassword = ref('')

const passwordRules = computed(() => {
  if (modalRef.value?.modalMode === 'add') {
    return z.string({ message: 'passwordRequired' }).min(1).default('')
  }

  return z.string({ message: 'passwordRequired' }).min(1).optional().default('')
})

const passwordConfirmRules = computed(() => {
  if (modalRef.value?.modalMode === 'add' || inputPassword.value) {
    return z
      .string({ message: 'passwordConfirmErr' })
      .min(1)
      .refine(
        (val) => {
          return val === inputPassword.value
        },
        {
          message: 'passwordConfirmErr'
        }
      )
      .default('')
  }

  return z
    .string({ message: 'passwordConfirmErr' })
    .min(1)
    .refine(
      (val) => {
        return val === inputPassword.value
      },
      {
        message: 'passwordConfirmErr'
      }
    )
    .optional()
    .default('')
})

const { AppForm, formApi } = useAppForm({
  fields: () =>
    [
      {
        as: 'ElInput',
        label: t('userName'),
        name: 'userName',
        schema: z
          .string({ message: t('userNameRequired') })
          .nonempty({ message: t('userNameRequired') })
          .default('')
      },
      {
        as: 'ElInput',
        label: t('password'),
        name: 'password',
        schema: passwordRules.value
      },
      {
        as: 'ElInput',
        label: t('passwordConfirm'),
        name: 'passwordConfirm',
        schema: passwordConfirmRules.value
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
        label: t('roles'),
        name: 'roles',
        schema: z.array(z.string()).default([])
      }
    ] as const satisfies Fields,
  async onSubmit({ i18nValues }) {
    if (modalRef.value?.modalMode === 'add') {
      if (typeof i18nValues.password === 'string') {
        await createUser({ ...i18nValues, password: i18nValues.password })
      }
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateUser({ id: editId.value, body: i18nValues })
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
  modalRef.value?.setTitle(t('addTitle'))
}

const edit = (item: AdminUser) => {
  editId.value = item.id
  modalRef.value?.setModalMode('edit')
  modalRef.value?.setTitle(t('editTitle'))
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
