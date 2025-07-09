<script setup lang="tsx">
import { ref, useTemplateRef } from 'vue'
import FolderSVG from './icons/folder.svg'
import VideoSVG from './icons/video.svg'
import {
  ElImage,
  ElSpace,
  ElButton,
  ElTableColumn,
  ElPopconfirm,
} from 'element-plus'
import { isFileItem, isGroupItem, type GroupPathItem } from './composables'
import { useFileI18n } from './composables/use-file-i18n'
import { AppTable } from '@aiknew/shared-ui-table'
import type { IUploadFile, IUploadFileGroup } from '@aiknew/shared-types'

export interface Props {
  currentGroupPath: GroupPathItem[]
}

export interface Emits {
  (e: 'edit-item', row: IUploadFile | IUploadFileGroup): void
  (e: 'click-item', row: IUploadFile | IUploadFileGroup): void
  (e: 'delete-item', row: IUploadFile | IUploadFileGroup): void
  (e: 'back-to-upper-group'): void
  (e: 'back-to-previous-group'): void
  (e: 'forward-to-next-group'): void
  (e: 'select', selection: IUploadFile[]): void
}

const emit = defineEmits<Emits>()
const { currentGroupPath } = defineProps<Props>()
const { t } = useFileI18n()

const loading = ref(false)
const appTableRef = useTemplateRef('appTable')
const selectedFiles = ref<IUploadFile[]>([])
const selectedGroups = ref<Set<string>>(new Set())

const getIcon = (row: IUploadFile | IUploadFileGroup) => {
  if (isGroupItem(row)) {
    return FolderSVG
  } else {
    if (row.mime.startsWith('image/')) {
      return <ElImage src={`/${row.filePath}`} fit="cover" loading="lazy" />
    }
    if (row.mime.startsWith('video/')) {
      return VideoSVG
    }
  }
}

const setRowClassName = ({ row }: { row: IUploadFile | IUploadFileGroup }) => {
  if (isGroupItem(row)) {
    const hasSelected = selectedGroups.value.has(row.id)
    const classNames = [
      `group-${row.id}`,
      hasSelected ? `has-file-selected` : ``,
    ]
    return classNames.join(' ')
  }
}

// Disable group item selection
const handleSelectable = (row: IUploadFile | IUploadFileGroup) => {
  return isFileItem(row)
}

// Only FileItem is selectable
const handleSelect = (selection: IUploadFile[], row: IUploadFile) => {
  const isCanceled = selectedFiles.value.length > selection.length
  selectedFiles.value = selection
  if (isCanceled) {
    currentGroupPath.forEach((item) =>
      selectedGroups.value.delete(item.groupId),
    )
  } else {
    selectedGroups.value = new Set([
      ...selectedGroups.value,
      ...selection.map((item) => item.groupId!),
      ...currentGroupPath.map((item) => item.groupId),
    ])
  }
  emit('select', selection)
}

const permissionType = (row: IUploadFile | IUploadFileGroup) => {
  if (isGroupItem(row)) {
    return '-group'
  }

  return '-file'
}

const editPermission = (row: IUploadFile | IUploadFileGroup) => {
  return 'edit' + permissionType(row)
}

const deletePermission = (row: IUploadFile | IUploadFileGroup) => {
  return 'delete' + permissionType(row)
}

const clearSelection = () => {
  appTableRef.value?.clearSelection()
  selectedGroups.value = new Set()
}

defineExpose({
  clearSelection,
})
</script>

<template>
  <!-- 
   
  -->
  <AppTable
    ref="appTable"
    :loading
    :pagination="false"
    v-bind="$attrs"
    :row-class-name="setRowClassName"
    @select-all="handleSelect"
    @select="handleSelect"
  >
    <template #header>
      <div class="file-list-header">
        <el-space warp>
          <el-button icon="Top" circle @click="$emit('back-to-upper-group')" />
          <el-button
            icon="ArrowLeft"
            circle
            @click="$emit('back-to-previous-group')"
          />
          <el-button
            icon="ArrowRight"
            circle
            @click="$emit('forward-to-next-group')"
          />
        </el-space>
      </div>
    </template>

    <template #default>
      <el-table-column
        type="selection"
        :selectable="handleSelectable"
        width="30"
        reserve-selection
      />
      <!-- <el-table-column prop="id" label="ID" width="120" /> -->
      <el-table-column
        prop="name"
        min-width="210"
        :label="t('name')"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <div class="item-name" @click.stop="$emit('click-item', row)">
            <component :is="getIcon(row)" />
            <div class="item-name__text">
              {{ isGroupItem(row) ? row.groupName : row.originalName }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="order" :label="t('order')" width="80" />
      <!-- <el-table-column prop="createdAt" :label="t('createdAt')" width="230" />
    <el-table-column prop="updatedAt" :label="t('updatedAt')" width="230" /> -->
      <el-table-column :label="t('operations')" width="130">
        <template #default="{ row }">
          <el-button
            v-permission:[editPermission(row)]="'/content/file'"
            type="primary"
            size="small"
            icon="Edit"
            @click.stop="$emit('edit-item', row)"
          />

          <el-popconfirm
            :title="t('deleteConfirm')"
            @confirm="$emit('delete-item', row)"
          >
            <template #reference>
              <!-- TODO: permission control remove -->
              <el-button
                v-permission:[deletePermission(row)]="'/content/file'"
                type="danger"
                icon="Delete"
                size="small"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </template>
  </AppTable>
</template>

<style>
.file-list-header {
  display: flex;
  justify-content: end;
}

.el-table__body tr[class*='group'] .el-table-column--selection .cell {
  display: none;
}

.el-table__body tr.has-file-selected {
  background-color: var(--el-color-primary-light-9);
}

.el-table,
.el-table__inner-wrapper {
  min-height: 150px;
}

.el-image {
  background: rgba(00, 00, 00, 0.15);
}

@media screen and (max-width: 768px) {
  .el-table__inner-wrapper {
    height: calc(-455px + 100vh);
  }

  .table-tooltip.el-popper {
    display: none;
  }
}

.item-type-tag {
  color: #fff;
}

.item-name {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.item-name img {
  width: 20px;
  height: 20px;
}

.item-name__text {
  margin-left: 6px;
  display: inline-block;
  user-select: none;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}
</style>
