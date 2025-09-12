<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElLink, ElTableColumn, ElButton, ElPopconfirm, ElSwitch } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed } from 'vue'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useTemplateRef } from 'vue'
import {
  useDictTypeList,
  useDictTypeDelete,
  type DictType,
  useDictTypeUpdate
} from '@/api/dict-type'
import DictTypeModal from './components/dict-type-modal.vue'
import { tField } from '@aiknew/shared-ui-locales'
import DictItemsDrawer from './components/dict-items-drawer.vue'

const { t } = useI18n()
const { currentPage, pageSize } = usePagination()

const dictTypeModalRef = useTemplateRef('dictTypeModalRef')
const dictItemsDrawerRef = useTemplateRef('dictItemsDrawer')

const {
  data: dictTypeData,
  refetch: refetchDictTypeData,
  isFetching: isFetchingDictTypeData
} = useDictTypeList(toReactive({ currentPage, pageSize }))
const { mutateAsync: updateDictType } = useDictTypeUpdate()

const { mutateAsync: deleteDictType, isPending: isDeleting } = useDictTypeDelete()

const isLoading = computed(() => {
  return isDeleting.value || isFetchingDictTypeData.value
})

const handleAdd = () => {
  dictTypeModalRef.value?.add()
}

const handleEdit = (row: DictType) => {
  dictTypeModalRef.value?.edit(row)
}

const handleDelete = async (row: DictType) => {
  await deleteDictType(row.id)
  refetchDictTypeData()
}

const handleToggleStatus = async (row: DictType) => {
  await updateDictType({
    id: row.id,
    body: {
      status: row.status
    }
  })
  refetchDictTypeData()
}

const handleSubmit = () => {
  refetchDictTypeData()
}

const handleCheckItems = (row: DictType) => {
  dictItemsDrawerRef.value?.show(tField(row.translations, 'name').value, row)
}
</script>

<template>
  <AppContentBlock class="mb-6"> </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">
        {{ t('add') }}
      </el-button>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :table-data="dictTypeData"
    >
      <el-table-column prop="key" :label="t('dictType.key')" width="150" />
      <el-table-column prop="name" :label="t('dictType.dictTypeName')" align="center">
        <template #default="{ row }: { row: DictType }">
          <span>{{ tField(row.translations, 'name').value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('dictType.dictItem')" align="center">
        <template #default="{ row }: { row: DictType }">
          <el-link type="primary" @click="handleCheckItems(row)">{{ t('check') }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="order" :label="t('order')" width="100" />
      <el-table-column prop="status" :label="t('status')" width="100">
        <template #default="{ row }: { row: DictType }">
          <el-switch v-model="row.status" @change="handleToggleStatus(row)" />
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="t('createdAt')" width="200" />
      <el-table-column prop="updatedAt" :label="t('updatedAt')" width="200" />
      <el-table-column :label="t('operations')" width="150" fixed="right">
        <template #default="scope">
          <el-button
            v-permission:edit
            type="primary"
            size="small"
            icon="Edit"
            @click="handleEdit(scope.row)"
          />

          <el-popconfirm :title="t('deleteConfirm')" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button v-permission:delete type="danger" icon="Delete" size="small" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </AppTable>
  </AppContentBlock>

  <DictTypeModal ref="dictTypeModalRef" @submit="handleSubmit" />
  <DictItemsDrawer ref="dictItemsDrawer" />
</template>
