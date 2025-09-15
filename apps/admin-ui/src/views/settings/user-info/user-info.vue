<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { useAppForm, type Fields } from '@aiknew/shared-ui-components'
import { useUserInfoUpdate } from '@/api/auth'
import z from 'zod'
import { h, ref } from 'vue'
import { ElButton, ElFormItem } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userStore = useUserStore()
const { mutateAsync: updateUserInfo, isPending: isUpdating } = useUserInfoUpdate()
const newPassword = ref('')

const { AppForm, formApi } = useAppForm({
  fields: () =>
    [
      {
        exclude: true,
        container: {
          content() {
            return h('div', { class: 'text-[var(--el-menu-text-color)]' }, userStore.userName)
          }
        },
        label: t('useInfo.userName')
      },
      {
        as: {
          component: 'ElInput',
          props: {
            type: 'password'
          }
        },
        label: t('useInfo.password'),
        name: 'password',
        schema: z.string().nonempty().default('')
      },
      {
        as: {
          component: 'ElInput',
          props: {
            type: 'password'
          }
        },
        label: t('useInfo.newPassword'),
        name: 'newPassword',
        schema: z.string().nonempty().default('')
      },
      {
        as: {
          component: 'ElInput',
          props: {
            type: 'password'
          }
        },
        label: t('useInfo.newPasswordConfirm'),
        name: 'newPasswordConfirm',
        schema: z
          .string()
          .refine((val) => {
            return val === newPassword.value
          })
          .default('')
      }
    ] as const satisfies Fields,
  async onSubmit({ values }) {
    updateUserInfo(values).then(() => {
      formApi.reset()
    })
  }
})

formApi.useStore((state) => {
  newPassword.value = state.values.newPassword
})
</script>

<template>
  <AppContentBlock v-loading="isUpdating">
    <AppForm>
      <ElFormItem label=" ">
        <ElButton @click="formApi.handleSubmit">{{ t('submit') }}</ElButton>
      </ElFormItem>
    </AppForm>
  </AppContentBlock>
</template>
