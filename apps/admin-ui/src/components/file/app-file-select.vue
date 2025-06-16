<script lang="ts" setup>
import { computed, ref, useTemplateRef } from 'vue'
import AppFileModal from './app-file-modal.vue'
import type { FileItem } from './composables'
import { ElImage, ElButton, ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const fileModalRef = useTemplateRef('fileModalRef')
const imgRefs = ref<Set<InstanceType<typeof ElImage>>>(new Set())
const selectedFiles = defineModel<FileItem[]>({
  default: []
})
const previewList = computed(() => {
  return selectedFiles.value.map((item) => `/${item.filePath}`) ?? []
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
  selectedFiles.value.splice(index, 1)
}

const handleFileModalSubmit = (data: FileItem[]) => {
  data.forEach((item) => {
    const exists = selectedFiles.value.some((selected) => selected.id === item.id)
    if (!exists) {
      selectedFiles.value.push(item)
    }
  })
}
</script>

<template>
  <div class="app-file-select">
    <!-- selected file list -->
    <div class="image-container" v-for="(item, index) in selectedFiles" :key="index">
      <div class="image-mask">
        <el-button icon="Search" circle @click="handleClickPreview(index)" />
        <el-button type="danger" icon="Delete" circle @click="handleDelete(index)" />
      </div>
      <el-image
        :ref="(instance: any) => setImgRef(instance, index)"
        style="width: 100px; height: 100px"
        :src="`/${item.filePath}`"
        :preview-src-list="previewList"
        show-progress
        :initial-index="index"
        fit="cover"
      />
    </div>
    <!-- select more button -->
    <div class="select-more-btn" @click="handleSelectMore">
      <el-icon size="30px" color="var(--el-text-color-secondary)">
        <Plus />
      </el-icon>
    </div>

    <AppFileModal ref="fileModalRef" @submit="handleFileModalSubmit" />
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
