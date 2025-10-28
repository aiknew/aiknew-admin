<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue"
import { ElDrawer } from "element-plus"
import { AppContentBlock } from "@aiknew/shared-ui-components"
import { ElTableColumn, ElButton, ElPopconfirm, ElSwitch } from "element-plus"
import { AppTable } from "@aiknew/shared-ui-components"
import { tField } from "@aiknew/shared-ui-locales"
import { useI18n } from "vue-i18n"
import { usePagination } from "@/composables"
import {
  useDictDelete,
  useDictList,
  useDictUpdate,
  type Dict,
} from "@/api/dict"
import { toReactive } from "@vueuse/core"
import DictModal from "./dict-modal.vue"
import type { DictType } from "@/api/dict-type"

const visible = ref(false)
const drawerTitle = ref("")
const currentDictType = ref<DictType>()
const dictTypeId = computed(() => {
  return currentDictType.value?.id ?? ""
})
const { currentPage, pageSize } = usePagination()
const { t } = useI18n()
const {
  data: dictItems,
  refetch,
  isFetching,
} = useDictList(toReactive({ currentPage, pageSize, dictTypeId }))

const show = (title: string | null | undefined, item: DictType) => {
  currentDictType.value = item
  drawerTitle.value = title ?? ""
  visible.value = true
}

const dictModalRef = useTemplateRef("dictModalRef")

const { mutateAsync: updateDict } = useDictUpdate()
const { mutateAsync: deleteDict, isPending: isDeleting } = useDictDelete()

const isLoading = computed(() => {
  return isDeleting.value || isFetching.value
})

const handleAdd = () => {
  dictModalRef.value?.add()
}

const handleEdit = (row: Dict) => {
  dictModalRef.value?.edit(row)
}

const handleDelete = async (row: Dict) => {
  await deleteDict(row.id)
  refetch()
}

const handleToggleStatus = async (row: Dict) => {
  await updateDict({
    id: row.id,
    body: {
      status: row.status,
    },
  })
  refetch()
}

const handleSubmit = () => {
  refetch()
}

defineExpose({
  show,
})
</script>

<template>
  <el-drawer
    v-model="visible"
    :title="t('dictType.dictTypeName') + ': ' + drawerTitle"
    size="50%"
  >
    <AppContentBlock v-loading="isLoading">
      <div class="mb-3 flex">
        <el-button class="ml-auto" type="primary" @click="handleAdd">
          {{ t("add") }}
        </el-button>
      </div>

      <AppTable
        ref="appTableRef"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :table-data="dictItems"
      >
        <el-table-column prop="label" :label="t('dictType.dictLabel')">
          <template #default="{ row }: { row: Dict }">
            <span>{{ tField(row.translations, "label").value }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="value"
          :label="t('dictType.dictValue')"
          width="120"
        />
        <el-table-column prop="order" :label="t('order')" width="80" />
        <el-table-column prop="status" :label="t('status')" width="100">
          <template #default="{ row }: { row: Dict }">
            <el-switch v-model="row.status" @change="handleToggleStatus(row)" />
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" :label="t('createdAt')" width="120" />
        <el-table-column :label="t('operations')" width="150" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="handleEdit(scope.row)"
            />

            <el-popconfirm
              :title="t('deleteConfirm')"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </AppTable>
    </AppContentBlock>

    <DictModal
      ref="dictModalRef"
      @submit="handleSubmit"
      v-model:dictType="currentDictType"
    />
  </el-drawer>
</template>

<style>
.el-drawer__header {
  margin-bottom: 0px;
}
</style>
