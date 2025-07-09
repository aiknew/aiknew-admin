<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useLangStore } from '@/stores/lang'
import { useDebounceFn } from '@vueuse/core'
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { AppFileManager, type SharedProps as FileProps } from '@aiknew/shared-ui-filer'
import { computed, ref, toRef, useTemplateRef, type Ref } from 'vue'
import { uploadFileUrl, useUploadFileDelete } from '@/api/upload-file'
import { useUploadFilesAndGroups, useUploadFileUpdate } from '@/api/upload-file'
import {
  useUploadFileGroupChildren,
  useUploadFileGroupCreate,
  useUploadFileGroupDelete,
  useUploadFileGroupUpdate
} from '@/api/upload-file-group'
import type { IUploadFile, IUploadFileGroup, IUploadFileQuery } from '@aiknew/shared-types'
import type Node from 'element-plus/es/components/tree/src/model/node'

const fileManagerRef = useTemplateRef('fileManager')
const userStore = useUserStore()
const langStore = useLangStore()
const { mutateAsync: deleteFile } = useUploadFileDelete()
const { mutateAsync: updateFile } = useUploadFileUpdate()
const { mutateAsync: deleteGroup } = useUploadFileGroupDelete()
const { mutateAsync: createFileGroup, error: createError } = useUploadFileGroupCreate()
const { mutateAsync: updateFileGroup, error: updateError } = useUploadFileGroupUpdate()
const { data: filesAndGroupsData, refetch: fetchFilesAndGroups } = useUploadFilesAndGroups(
  computed(() => fileManagerRef.value?.query)
)
const {
  id: parentGroupId,
  query: { data: childGroups, refetch: fetchChildGroups }
} = useUploadFileGroupChildren()
const uploadUrl = import.meta.env.VITE_API_BASE_URL + uploadFileUrl
const uploadHeaders = {
  Authorization: `Bearer ${userStore.accessToken}`,
  'x-lang': langStore.currentLang
}

const handleDeleteFile = useDebounceFn(async (item: IUploadFile) => {
  await deleteFile(item.id)
}, 300)
const handleDeleteGroup = useDebounceFn(async (item: IUploadFileGroup) => {
  await deleteGroup(item.id)
}, 300)
const deleteSelected = () => {}

const fetchChildren = async (groupId: string) => {
  parentGroupId.value = groupId
  await fetchChildGroups()
  return childGroups.value ?? []
}
const loadGroupNode = (
  currentEditGroupId: Ref<string | undefined>,
  node: Node,
  resolve: (data: Omit<IUploadFileGroup, 'updatedAt' | 'createdAt'>[]) => void,
  reject: () => void
) => {
  // resolve the top level group
  if (!node.key && node.level == 0) {
    return resolve([
      {
        id: '0',
        groupName: 'Top',
        parentId: '',
        ancestors: [],
        order: 0
      }
    ])
  }

  // check if the group was disabled
  if (node.disabled) {
    return resolve([])
  }

  // fetch from the server api
  fetchChildren(String(node.key ?? '0'))
    .then((data) => {
      resolve(
        data.map((item) => {
          // set current group disable
          if (item.id === currentEditGroupId.value) {
            return {
              ...item,
              disabled: true
            }
          }
          return item
        })
      )
    })
    .catch(reject)
}
</script>

<template>
  <AppContentBlock>
    <AppFileManager
      ref="fileManager"
      :delete-group="handleDeleteGroup"
      :delete-file="handleDeleteFile"
      :files-and-groups-data
      :upload-url
      :upload-headers
      :delete-selected
      :create-file-group
      :update-file-group
      :load-group-node
      :update-file
      @refresh="fetchFilesAndGroups"
    />
  </AppContentBlock>
</template>
