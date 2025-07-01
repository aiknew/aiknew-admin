<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { AppForm, AppFormItemTips, makeFields, type Field } from '@aiknew/shared-ui-form'
import { useUserInfoI18n } from './composables/use-user-info-i18n'
import { useUserInfoUpdate } from '@/api/admin-auth'
import z from 'zod'
import { computed, h, useTemplateRef, type ComputedRef } from 'vue'
import { ElButton, ElFormItem } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useLangStore } from '@/stores/lang'

const { t } = useUserInfoI18n()
const userStore = useUserStore()
const langStore = useLangStore()
const { mutateAsync: updateUserInfo, isPending: isUpdating } = useUserInfoUpdate()
const appFormRef = useTemplateRef('appFormRef')
const newPassword = computed(() => {
  return appFormRef.value?.values['newPassword']
}) as ComputedRef<string>

const fields = makeFields(
  {
    as: 'ElFormItem',
    name: 'userName',
    label: 'userName',
    rules: z.string().optional(),
    attrs: {
      slots: {
        default() {
          return [h('div', { class: 'text-[var(--el-menu-text-color)]' }, userStore.userName)]
        }
      }
    }
  },
  {
    as: 'ElInput',
    label: 'password',
    name: 'password',
    rules: z.string().nonempty(),
    attrs: {
      type: 'password'
    }
  },
  {
    as: 'ElInput',
    label: 'newPassword',
    name: 'newPassword',
    rules: z.string().nonempty(),
    attrs: {
      type: 'password'
    }
  },
  {
    as: 'ElInput',
    label: 'newPasswordConfirm',
    name: 'newPasswordConfirm',
    rules: z.string().refine((val) => {
      return val === newPassword.value
    }),
    attrs: {
      type: 'password'
    }
  },
  {
    as: 'ElFormItem',
    name: 'operations',
    label: '',
    rules: z.string().optional(),
    attrs: {
      slots: {
        default() {
          return [
            h(
              ElButton,
              {
                type: 'primary',
                onClick() {
                  console.log('submit')
                  appFormRef.value?.submit().then(async (values) => {
                    console.log('values: ', values)
                    updateUserInfo(values).then(() => {
                      appFormRef.value?.reset()
                    })
                  })
                }
              },
              () => h('div', t('submit'))
            )
          ]
        },
        label() {
          return [h('div', '')]
        }
      }
    }
  }
)
</script>

<template>
  <AppContentBlock v-loading="isUpdating">
    <AppForm ref="appFormRef" :t :fields :languages="langStore.enabledLangs" />
  </AppContentBlock>
</template>
