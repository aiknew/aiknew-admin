<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag, ElFormItem } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed, ref } from 'vue'
import { useConfigDelete, useConfigList, type Config, type QueryConfigDto } from '@/api/config'
import { toReactive } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import ConfigModal from './components/config-modal.vue'
import { tField } from '@aiknew/shared-ui-locales'
import { useI18n } from 'vue-i18n'
import { useAppForm, type Fields } from '@aiknew/shared-ui-form'
import z from 'zod'

const configModalRef = useTemplateRef('configModalRef')
const { t } = useI18n()
const query = ref<QueryConfigDto>({
  currentPage: 1,
  pageSize: 10
})

const {
  data: configData,
  refetch: refetchConfigData,
  isFetching: isFetchingConfigData
} = useConfigList(toReactive(query))

const { mutateAsync: deleteConfig, isPending: isDeleting } = useConfigDelete()
const isLoading = computed(() => {
  return isDeleting.value || isFetchingConfigData.value
})

const handleAdd = () => {
  configModalRef.value?.add()
}

const handleEdit = (row: Config) => {
  configModalRef.value?.edit(row)
}

const refresh = () => {
  refetchConfigData()
}

const handleDelete = async (row: Config) => {
  await deleteConfig(row.id)
  refresh()
}

const handleSubmit = () => {
  refresh()
}

const { AppForm: QueryForm, formApi } = useAppForm({
  formProps: {
    inline: true
  },
  fields() {
    return [
      {
        as: {
          component: 'ElInput'
        },
        label: t('name'),
        name: 'name',
        schema: z.string().default('').optional()
      },

      {
        as: {
          component: 'ElInput'
        },
        label: t('configView.remark'),
        name: 'remark',
        schema: z.string().default('').optional()
      },

      {
        as: {
          component: 'ElInput'
        },
        label: t('configView.key'),
        name: 'key',
        schema: z.string().default('').optional()
      },

      {
        as: {
          component: 'ElInput'
        },
        label: t('configView.value'),
        name: 'value',
        schema: z.string().default('').optional()
      }
    ] as const satisfies Fields
  },
  onSubmit({ values }) {
    query.value = {
      ...query.value,
      ...values
    }
  }
})

const handleResetQueryForm = () => {
  formApi.reset()
  query.value = {
    currentPage: 1,
    pageSize: 10
  }
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
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">{{ t('add') }}</el-button>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="query.currentPage"
      v-model:page-size="query.pageSize"
      :table-data="configData"
    >
      <el-table-column prop="id" label="ID" width="150" show-overflow-tooltip />
      <el-table-column :label="t('configView.name')" width="200">
        <template #default="{ row }: { row: Config }">
          <span>{{ tField(row.translations, 'name').value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="key" :label="t('configView.key')" width="150" />
      <el-table-column prop="value" :label="t('configView.value')" width="150" />
      <el-table-column prop="system" :label="t('configView.configType')" width="120" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.system" type="danger">{{ t('configView.system') }}</el-tag>
          <el-tag v-else type="primary">{{ t('configView.user') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('configView.remark')" show-overflow-tooltip>
        <template #default="{ row }: { row: Config }">
          <span>{{ tField(row.translations, 'remark').value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="t('createdAt')" width="180" />
      <el-table-column prop="updatedAt" :label="t('updatedAt')" width="180" />
      <el-table-column :label="t('operations')" width="150" fixed="right">
        <template #default="scope">
          <el-button
            v-permission:edit
            type="primary"
            size="small"
            icon="Edit"
            @click="handleEdit(scope.row)"
          />

          <el-popconfirm :title="t('deleteConfirm')" @confirm="() => handleDelete(scope.row)">
            <template #reference>
              <el-button
                v-permission:delete
                v-if="!scope.row.system"
                type="danger"
                icon="Delete"
                size="small"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </AppTable>

    <ConfigModal ref="configModalRef" @submit="handleSubmit" />
  </AppContentBlock>
</template>
