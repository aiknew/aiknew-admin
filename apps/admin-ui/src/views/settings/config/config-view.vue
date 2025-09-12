<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed } from 'vue'
import { useConfigDelete, useConfigList, type Config } from '@/api/config'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import ConfigModal from './components/config-modal.vue'
import { tField } from '@aiknew/shared-ui-locales'
import { useI18n } from 'vue-i18n'

const configModalRef = useTemplateRef('configModalRef')
const { t } = useI18n()
const { currentPage, pageSize } = usePagination()

const {
  data: configData,
  refetch: refetchConfigData,
  isFetching: isFetchingConfigData
} = useConfigList(
  toReactive({
    currentPage,
    pageSize
  })
)

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
</script>

<template>
  <AppContentBlock class="mb-6" v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">{{ t('add') }}</el-button>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :table-data="configData"
    >
      <el-table-column prop="id" label="ID" width="200" />
      <el-table-column :label="t('configView.name')" width="200">
        <template #default="{ row }: { row: Config }">
          <span>{{ tField(row.translations, 'name').value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('configView.remark')">
        <template #default="{ row }: { row: Config }">
          <span>{{ tField(row.translations, 'remark').value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="key" :label="t('configView.key')" width="200" />
      <el-table-column prop="value" :label="t('configView.value')" min-width="150" />
      <el-table-column prop="system" :label="t('configView.configType')" width="120" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.system" type="danger">{{ t('configView.system') }}</el-tag>
          <el-tag v-else type="primary">{{ t('configView.user') }}</el-tag>
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
