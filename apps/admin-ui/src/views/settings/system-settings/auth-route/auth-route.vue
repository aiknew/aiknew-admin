<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-table'
import { computed, ref } from 'vue'
import { usePagination } from '@/composables'
import { toReactive } from '@vueuse/core'
import { useAuthRouteI18n } from './composables/use-auth-route-i18n'
import { useTemplateRef } from 'vue'
import {
  useAuthRouteChildren,
  useAuthRouteDelete,
  useAuthRouteList,
  type AuthRoute,
  type RouteType
} from '@/api/auth-route'
import AuthRouteModal from './components/auth-route-modal.vue'
import { tField } from '@aiknew/shared-ui-locales'

const { t } = useAuthRouteI18n()
const { currentPage, pageSize } = usePagination()

const {
  data: authRouteData,
  refetch: refetchAuthRouteData,
  isFetching: isFetchingAuthRouteData
} = useAuthRouteList(toReactive({ currentPage, pageSize }))
const parentId = ref('0')
const { refetch: fetchRouteChildren } = useAuthRouteChildren(parentId)

// Get tag's text
const getTypeText = (type: RouteType) => {
  switch (type) {
    case 'GROUP':
      return t('routeTypeGroup')
    case 'SMALL_GROUP':
      return t('routeTypeSmallGroup')
    case 'MENU':
      return t('routeTypeMenu')
    case 'BUTTON':
      return t('routeTypeButton')
  }
}
// Get tag's color
const getTypeColor = (type: RouteType) => {
  switch (type) {
    case 'GROUP':
      return '#3a9cfb'
    case 'SMALL_GROUP':
      return '#909399'
    case 'MENU':
      return '#67c23a'
    case 'BUTTON':
      return '#ff9800'
  }
}

const loadChildren = (row: AuthRoute, treeNode: unknown, resolve: (data: AuthRoute[]) => void) => {
  parentId.value = row.id
  fetchRouteChildren()
    .then(({ data }) => {
      const arr = data ?? []
      const res = arr.map((item) => ({ ...item, hasChildren: true }))
      resolve(res)
    })
    .catch(() => {
      resolve([])
    })
}

const { mutateAsync: deleteAuthRoute, isPending: isDeleting } = useAuthRouteDelete()
const isLoading = computed(() => {
  return isDeleting.value || isFetchingAuthRouteData.value
})

const modalRef = useTemplateRef('modalRef')
const handleAdd = () => {
  modalRef.value?.add()
}

const handleEdit = (row: AuthRoute) => {
  modalRef.value?.edit(row)
}

const refresh = (updatedParentIds: string[]) => {
  refetchAuthRouteData().then(({ isSuccess }) => {
    if (isSuccess) {
      updatedParentIds.forEach((id) => {
        fetchRouteChildren().then(({ data }) => {
          if (data) {
            appTableRef.value?.updateKeyChildren(
              id,
              data.map((item) => {
                return {
                  ...item,
                  hasChildren: true
                }
              })
            )
          }
        })
      })
    }
  })
}

const handleDelete = async (row: AuthRoute) => {
  await deleteAuthRoute(row.id)
  refresh([row.parentId])
}

const appTableRef = useTemplateRef('appTableRef')
const handleSubmit = ({ updatedParentIds }: { updatedParentIds: string[] }) => {
  refresh(updatedParentIds)
}
</script>

<template>
  <AppContentBlock class="mb-6"> </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">{{ t('add') }}</el-button>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :table-data="authRouteData"
      row-key="id"
      tree
      lazy
      :load="loadChildren"
    >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" :label="t('name')" width="180">
        <template #default="{ row }: { row: AuthRoute }">
          <span>{{ tField(row.translations, 'routeName').value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" :label="t('routeType')" width="120">
        <template #default="{ row }">
          <el-tag class="text-white!" :color="getTypeColor(row.type)">
            {{ getTypeText(row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order" :label="t('order')" width="100" />
      <el-table-column prop="createdAt" :label="t('createdAt')" width="220" />
      <el-table-column prop="updatedAt" :label="t('updatedAt')" width="220" />
      <el-table-column :label="t('operations')" width="150">
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

  <AuthRouteModal ref="modalRef" @submit="handleSubmit" />
</template>
