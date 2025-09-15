<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElFormItem, ElTag } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-components'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppForm, type Fields } from '@aiknew/shared-ui-components'
import z from 'zod'
import { useLoginLogList, type LoginLogDto, type QueryLoginLogDto } from '@/api/login-log'
import { toReactive } from '@vueuse/core'

const { t } = useI18n()
const query = ref<QueryLoginLogDto>({
  currentPage: 1,
  pageSize: 10
})

const {
  data: loginLogData,
  refetch: refetchLoginLogData,
  isFetching: isFetchingLoginLogs
} = useLoginLogList(toReactive(query))

const isLoading = computed(() => {
  return isFetchingLoginLogs.value
})

const refresh = () => {
  refetchLoginLogData()
}

const { AppForm: QueryForm, formApi } = useAppForm({
  formProps: {
    inline: true,
    labelPosition: 'left'
  },
  fields() {
    return [
      {
        as: {
          component: 'ElInput'
        },
        label: t('loginLog.userName'),
        name: 'userName',
        schema: z.string().default('').optional()
      },
      {
        as: {
          component: 'ElInput'
        },
        label: t('loginLog.ip'),
        name: 'ip',
        schema: z.string().default('').optional()
      },
      {
        as: {
          component: 'ElInput'
        },
        label: t('loginLog.location'),
        name: 'location',
        schema: z.string().default('').optional()
      },
      {
        as: {
          component: 'ElInput'
        },
        label: t('loginLog.os'),
        name: 'os',
        schema: z.string().default('').optional()
      },
      {
        as: {
          component: 'ElInput'
        },
        label: t('loginLog.browser'),
        name: 'browser',
        schema: z.string().default('').optional()
      }
    ] as const satisfies Fields
  },
  onSubmit({ values }) {
    query.value = {
      ...query.value,
      ...values
    }
    refresh()
  }
})

const handleResetQueryForm = () => {
  formApi.reset()
  query.value = {
    currentPage: 1,
    pageSize: 10
  }
  refresh()
}
</script>

<template>
  <AppContentBlock class="mb-6">
    <QueryForm>
      <el-form-item>
        <el-button type="primary" @click="formApi.handleSubmit">
          {{ t('submit') }}
        </el-button>
        <el-button @click="handleResetQueryForm">{{ t('reset') }}</el-button>
      </el-form-item>
    </QueryForm>
  </AppContentBlock>

  <AppContentBlock class="mb-6" v-loading="isLoading">
    <AppTable
      ref="appTableRef"
      v-model:current-page="query.currentPage"
      v-model:page-size="query.pageSize"
      :table-data="loginLogData"
    >
      <el-table-column prop="userName" :label="t('loginLog.userName')" width="120" />
      <el-table-column prop="ip" :label="t('loginLog.ip')" width="150" />
      <el-table-column
        prop="location"
        :label="t('loginLog.location')"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column prop="os" :label="t('loginLog.os')" width="150" />
      <el-table-column prop="browser" :label="t('loginLog.browser')" width="180" />
      <el-table-column prop="isSuccess" :label="t('status')">
        <template #default="{ row }: { row: LoginLogDto }">
          <el-tag v-if="row.isSuccess" type="success">{{ t('success') }}</el-tag>
          <el-tag type="danger" v-else>{{ t('failed') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="t('loginLog.createdAt')" width="180" />
      <el-table-column
        prop="userAgent"
        :label="t('loginLog.userAgent')"
        min-width="300"
        show-overflow-tooltip
      />
    </AppTable>
  </AppContentBlock>
</template>
