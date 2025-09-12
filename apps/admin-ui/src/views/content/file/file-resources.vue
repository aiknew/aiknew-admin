<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useDebounceFn } from '@vueuse/core'
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { AppFileManager, type UploadStorage } from '@aiknew/shared-ui-filer'
import { computed, useTemplateRef, type Ref } from 'vue'
import { localUploadFilePath, useUploadFileDelete, useUploadFilePresigned } from '@/api/upload-file'
import { useUploadFilesAndGroups, useUploadFileUpdate } from '@/api/upload-file'
import {
  useUploadFileGroupChildren,
  useUploadFileGroupCreate,
  useUploadFileGroupDelete,
  useUploadFileGroupUpdate
} from '@/api/upload-file-group'
import type { IUploadFile, IUploadFileGroup } from '@aiknew/shared-types'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ElMessage } from 'element-plus'
import { currentLang } from '@aiknew/shared-ui-locales'
import { resolveURL } from '@aiknew/shared-ui-utils'
import { useFileStorageAll } from '@/api/file-storage'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const fileManagerRef = useTemplateRef('fileManager')
const userStore = useUserStore()
const { refetch: fetchPresignedUrl, data: presignedUrlData } = useUploadFilePresigned(
  computed(() => {
    const groupId = fileManagerRef.value?.query.parentId
    const query = groupId ? { groupId } : undefined

    return query
  })
)
const { mutateAsync: deleteFile } = useUploadFileDelete()
const { mutateAsync: updateFile } = useUploadFileUpdate()
const { mutateAsync: deleteGroup } = useUploadFileGroupDelete()
const { mutateAsync: createFileGroup } = useUploadFileGroupCreate()
const { mutateAsync: updateFileGroup } = useUploadFileGroupUpdate()
const { data: filesAndGroupsData, refetch: fetchFilesAndGroups } = useUploadFilesAndGroups(
  computed(() => fileManagerRef.value?.query)
)
const {
  id: parentGroupId,
  query: { data: childGroups, refetch: fetchChildGroups }
} = useUploadFileGroupChildren()
const { data: fileStorages } = useFileStorageAll()
const storages = computed<UploadStorage[]>(() => {
  if (!fileStorages.value) {
    return []
  }
  return fileStorages.value
    .filter((item) => item.status === 'NORMAL')
    .map((item) => {
      if (item.type === 'S3') {
        return {
          id: item.id,
          name: item.name,
          async uploadURL(extraFormData, uploadHeaders) {
            // clear default extra headers
            uploadHeaders.value = {}

            // get the presigned url
            await fetchPresignedUrl()

            if (presignedUrlData.value) {
              const { fields } = presignedUrlData.value
              extraFormData.value = fields

              return resolveURL(item.hostname, item.bucket ?? '')
            }

            return ''
          }
        }
      } else {
        const hostname = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : item.hostname

        return {
          id: item.id,
          name: item.name,
          uploadURL: (extraFormData, uploadHeaders, { currentGroupId, selectedStorageId }) => {
            extraFormData.value = {
              fileStorageId: selectedStorageId,
              groupId: currentGroupId
            }
            uploadHeaders.value = {
              Authorization: `Bearer ${userStore.accessToken}`,
              'x-lang': currentLang.value
            }
            return resolveURL(hostname, localUploadFilePath)
          }
        }
      }
    })
})

const beforeUpload = async () => {
  if (
    !fileStorages.value ||
    fileStorages.value.filter((item) => item.status === 'NORMAL').length === 0
  ) {
    ElMessage({
      type: 'error',
      message: 'No file storage is enabled'
    })

    return false
  }
  return true
}

const handleDeleteFile = useDebounceFn(async (item: IUploadFile) => {
  await deleteFile(item.id)
}, 300)
const handleDeleteGroup = useDebounceFn(async (item: IUploadFileGroup) => {
  await deleteGroup(item.id)
}, 300)
const deleteSelected = (items: IUploadFile[]) => {
  const promises: Promise<unknown>[] = []
  items.forEach((item) => {
    promises.push(deleteFile(item.id))
  })

  return Promise.allSettled(promises)
}

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
    return resolve([{ id: '0', groupName: t('top'), parentId: '', ancestors: [], order: 0 }])
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
      :storages
      :before-upload
      :delete-group="handleDeleteGroup"
      :delete-file="handleDeleteFile"
      :files-and-groups-data
      :delete-selected
      :create-file-group
      :update-file-group
      :load-group-node
      :update-file
      @refresh="fetchFilesAndGroups"
    />
  </AppContentBlock>
</template>
