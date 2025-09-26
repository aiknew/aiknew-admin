<script lang="ts" setup>
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { ElTableColumn, ElFormItem, ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { AppTable } from '@aiknew/shared-ui-components'
import { computed, ref } from 'vue'
import { usePagination } from '@/composables'
import { useTemplateRef } from 'vue'
import {
  useAuthRouteAll,
  useAuthRouteDelete,
  type AuthRoute,
  type QueryAuthRouteDto,
  type RouteType
} from '@/api/auth-route'
import AuthRouteModal from './components/auth-route-modal.vue'
import { tField } from '@aiknew/shared-ui-locales'
import { type Fields } from '@aiknew/shared-ui-components'
import z from 'zod'
import { buildTree } from '@aiknew/shared-utils'
import { useI18n } from 'vue-i18n'
import { useAdminForm } from '@/composables/use-admin-form'

const { t } = useI18n()
const { currentPage, pageSize } = usePagination()
const modalRef = useTemplateRef('modalRef')
const query = ref<QueryAuthRouteDto>({})
const { data: routes, refetch: refetchAuthRouteData, isFetching } = useAuthRouteAll(query)
const { mutateAsync: deleteAuthRoute, isPending: isDeleting } = useAuthRouteDelete()

const routesTree = computed(() => buildTree(routes.value, 'id', 'parentId'))

const isLoading = computed(() => {
  return isDeleting.value || isFetching.value
})

// Get tag's text
const getTypeText = (type: RouteType) => {
  switch (type) {
    case 'GROUP':
      return t('authRoute.routeTypeGroup')
    case 'SMALL_GROUP':
      return t('authRoute.routeTypeSmallGroup')
    case 'MENU':
      return t('authRoute.routeTypeMenu')
    case 'BUTTON':
      return t('authRoute.routeTypeButton')
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

const handleAdd = () => {
  modalRef.value?.add()
}

const handleEdit = (row: AuthRoute) => {
  modalRef.value?.edit(row)
}

const refresh = () => {
  refetchAuthRouteData()
}

const handleDelete = async (row: AuthRoute) => {
  await deleteAuthRoute(row.id)
  refresh()
}

const handleSubmit = () => {
  refresh()
}

const { AppForm: QueryForm, formApi } = useAdminForm({
  formProps: {
    inline: true,
    labelPosition: 'left'
  },
  fields() {
    return [
      {
        as: 'ElInput',
        label: 'id',
        name: 'id',
        schema: z.string().default('').optional()
      },
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
          component: 'ElSelectV2',
          props: {
            style: { width: '150px' },
            options: [
              { label: t('authRoute.routeTypeMenu'), value: 'MENU' },
              {
                label: t('authRoute.routeTypeGroup'),
                value: 'GROUP'
              },
              {
                label: t('authRoute.routeTypeSmallGroup'),
                value: 'SMALL_GROUP'
              },
              {
                label: t('authRoute.routeTypeButton'),
                value: 'BUTTON'
              }
            ]
          }
        },
        label: t('authRoute.routeType'),
        name: 'type',
        schema: z.enum(['MENU', 'BUTTON', 'GROUP', 'SMALL_GROUP']).default('MENU').optional()
      }
    ] as const satisfies Fields
  },
  onSubmit({ values }) {
    query.value = values
  }
})

const handleResetQueryForm = () => {
  formApi.reset()
  query.value = {}
}
</script>

<template>
  <AppContentBlock class="mb-6">
    <QueryForm>
      <el-form-item>
        <el-button type="primary" @click="formApi.handleSubmit">{{ t('submit') }}</el-button>
        <el-button @click="handleResetQueryForm">{{ t('reset') }}</el-button>
      </el-form-item>
    </QueryForm>
  </AppContentBlock>

  <AppContentBlock v-loading="isLoading">
    <div class="mb-3 flex">
      <el-button class="ml-auto" type="primary" @click="handleAdd">{{ t('add') }}</el-button>
    </div>

    <AppTable
      ref="appTableRef"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :pagination="false"
      :table-data="routesTree"
      row-key="id"
    >
      <el-table-column prop="id" label="ID" width="150" show-overflow-tooltip />
      <el-table-column prop="name" :label="t('name')">
        <template #default="{ row }: { row: AuthRoute }">
          <span>{{ tField(row.translations, 'routeName').value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" :label="t('authRoute.routeType')" width="120">
        <template #default="{ row }">
          <el-tag class="text-white!" :color="getTypeColor(row.type)">
            {{ getTypeText(row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order" :label="t('order')" width="100" />
      <el-table-column prop="createdAt" :label="t('createdAt')" width="220" />
      <el-table-column prop="updatedAt" :label="t('updatedAt')" width="220" />
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

  <AuthRouteModal ref="modalRef" :routes="routesTree" @submit="handleSubmit" />
</template>
