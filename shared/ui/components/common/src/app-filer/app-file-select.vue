<script lang="ts" setup>
import { computed, ref, useTemplateRef, watch } from 'vue'
import AppFileModal, {
  type Props as FileModalProps,
} from './app-file-modal.vue'
import { ElImage, ElButton, ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { IUploadFile, IUploadFileQuery } from '@aiknew/shared-types'
import { resolveURL } from '@aiknew/shared-ui-utils'

export interface Props extends FileModalProps {}

interface Emits {
  (e: 'refresh'): void
}

const {
  beforeUpload,
  createFileGroup,
  deleteFile,
  deleteGroup,
  deleteSelected,
  filesAndGroupsData,
  loadGroupNode,
  storages,
  updateFile,
  updateFileGroup,
  selectLimit,
  showAddGroup,
  showDeleteFile,
  showDeleteGroup,
  showEditFile,
  showEditGroup,
  showUploadFile,
} = defineProps<Props>()
defineEmits<Emits>()

const fileModalRef = useTemplateRef('fileModal')
const imgRefs = ref<Set<InstanceType<typeof ElImage>>>(new Set())
const selected = defineModel<IUploadFile[]>('selected', {
  default: [],
})
const queryModel = defineModel<IUploadFileQuery>('query', {
  default: {
    currentPage: 1,
    pageSize: 10,
    keyword: '',
    parentId: null,
  },
})

const resolveImgSrc = (item: IUploadFile) => {
  if (item.filePath.startsWith(item.storage.hostname)) {
    return item.filePath
  }

  return resolveURL(item.storage.hostname, item.filePath)
}

const previewList = computed(() => {
  return selected.value.map((item) => resolveImgSrc(item)) ?? []
})

const showMoreBtn = computed(() => {
  if (typeof selectLimit === 'undefined') return true

  return selected.value.length < selectLimit
})

const restSelectLimit = computed(() => {
  if (typeof selectLimit === 'undefined') return undefined

  return selectLimit - selected.value.length
})

const setImgRef = (instance: InstanceType<typeof ElImage>, index: number) => {
  if (instance) {
    imgRefs.value.add(instance)
  } else {
    const arr = Array.from(imgRefs.value)
    arr.splice(index, 1)
    imgRefs.value = new Set(arr)
  }
}

const handleSelectMore = () => {
  fileModalRef.value?.show()
}

const handleClickPreview = (index: number) => {
  const refsArr = Array.from(imgRefs.value)
  if (refsArr[index]) {
    refsArr[index].showPreview()
  }
}

const handleDelete = (index: number) => {
  const items = [...selected.value]
  items.splice(index, 1)
  selected.value = [...items]
}

const handleFileModalSubmit = (data: IUploadFile[]) => {
  selected.value = data.filter(
    (item) => !selected.value.some((selected) => selected.id === item.id),
  )
}
</script>

<template>
  <div class="app-file-select">
    <!-- selected file list -->
    <div class="image-container" v-for="(item, index) in selected" :key="index">
      <div class="image-mask">
        <el-button icon="Search" circle @click="handleClickPreview(index)" />
        <el-button
          type="danger"
          icon="Delete"
          circle
          @click="handleDelete(index)"
        />
      </div>
      <el-image
        :ref="(instance: any) => setImgRef(instance, index)"
        style="width: 100px; height: 100px"
        :src="resolveImgSrc(item)"
        :preview-src-list="previewList"
        show-progress
        :initial-index="index"
        fit="cover"
      />
    </div>
    <!-- select more button -->
    <div class="select-more-btn" v-show="showMoreBtn" @click="handleSelectMore">
      <el-icon size="30px" color="var(--el-text-color-secondary)">
        <Plus />
      </el-icon>
    </div>

    <AppFileModal
      ref="fileModal"
      v-model:query="queryModel"
      :select-limit="restSelectLimit"
      :before-upload
      :create-file-group
      :delete-file
      :delete-group
      :delete-selected
      :files-and-groups-data
      :load-group-node
      :storages
      :update-file
      :update-file-group
      :show-add-group
      :show-delete-group
      :show-edit-file
      :show-edit-group
      :show-upload-file
      :show-delete-file
      @submit="handleFileModalSubmit"
      @refresh="$emit('refresh')"
    />
  </div>
</template>

<style lang="scss" scoped>
.app-file-select {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .image-container {
    position: relative;

    .image-mask {
      opacity: 0;
      visibility: hidden;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
      background-color: rgba(0, 0, 0, 0.35);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity ease 0.5s;
    }

    &:hover {
      .image-mask {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .select-more-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100px;
    height: 100px;
    background-color: var(--el-fill-color-lighter);
    border: 1px dashed var(--el-border-color-darker);
  }
}
</style>
