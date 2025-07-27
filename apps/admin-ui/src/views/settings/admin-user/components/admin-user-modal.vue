<script lang="ts" setup>
import { AppBasicModal } from '@aiknew/shared-ui-components'
import { ref, nextTick, h, computed, useTemplateRef, watch, type Ref, type ComputedRef } from 'vue'
import { z } from 'zod'
import { AppForm, makeFields } from '@aiknew/shared-ui-form'
import { useLangStore } from '@/stores/lang'
import { useAdminUserI18n } from '../composables/use-admin-user-i18n'
import { useAdminUserCreate, useAdminUserUpdate, type AuthUser } from '@/api/auth-user'
import { useAdminRoleAll, type AdminRole } from '@/api/admin-role'
import { tField } from '@aiknew/shared-ui-locales'

interface Emits {
  (e: 'submit'): void
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useAdminUserI18n()
const appFormRef = useTemplateRef('appFormRef')
const modalRef = useTemplateRef('modalRef')
const editId = ref('')
const { mutateAsync: createUser } = useAdminUserCreate()
const { mutateAsync: updateUser } = useAdminUserUpdate()
const { data: adminRoles } = useAdminRoleAll()
const inputPassword = computed(() => {
  return appFormRef.value?.values['password']
}) as ComputedRef<string>

const passwordRules = computed(() => {
  if (modalRef.value?.modalMode === 'add') {
    return z.string({ message: 'passwordRequired' })
  }

  return z.string({ message: 'passwordRequired' }).optional()
})

const passwordConfirmRules = computed(() => {
  if (modalRef.value?.modalMode === 'add' || inputPassword.value) {
    return z.string({ message: 'passwordConfirmErr' }).refine(
      (val) => {
        return val === inputPassword.value
      },
      {
        message: 'passwordConfirmErr'
      }
    )
  }

  return z
    .string({ message: 'passwordConfirmErr' })
    .refine(
      (val) => {
        return val === inputPassword.value
      },
      {
        message: 'passwordConfirmErr'
      }
    )
    .optional()
})

const fields = makeFields(
  {
    as: 'ElInput',
    label: 'userName',
    name: 'userName',
    rules: z.string({ message: 'userNameRequired' }).nonempty({ message: 'userNameRequired' })
  },
  {
    as: 'ElInput',
    label: 'password',
    name: 'password',
    rules: passwordRules
  },
  {
    as: 'ElInput',
    label: 'passwordConfirm',
    name: 'passwordConfirm',
    rules: passwordConfirmRules
  },
  {
    as: 'ElTreeSelect',
    label: 'roles',
    name: 'roles',
    rules: z.array(z.string()),
    attrs: {
      multiple: true,
      valueKey: 'id',
      nodeKey: 'id',
      props: {
        label: (data: AdminRole) => {
          return tField(data.translations, 'roleName').value
        }
      },
      data: computed(() => adminRoles.value)
    }
  }
)

const handleSubmit = () => {
  appFormRef.value?.submit().then(async (values) => {
    if (modalRef.value?.modalMode === 'add') {
      if (typeof values.password === 'string') {
        await createUser({ ...values, password: values.password })
      }
    } else if (modalRef.value?.modalMode === 'edit') {
      await updateUser({ id: editId.value, body: values })
    }

    emit('submit')
    handleReset()
  })
}

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode('add')
  modalRef.value?.setTitle(t('addTitle'))
}

const edit = (item: AuthUser) => {
  editId.value = item.id
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
