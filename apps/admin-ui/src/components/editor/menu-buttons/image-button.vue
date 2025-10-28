<script setup lang="ts">
import { ImagePlus } from "lucide-vue-next"
import type { TipTapEditor } from "@aiknew/element-plus-tiptap"
import AdminFileModal from "@/components/file/admin-file-modal.vue"
import { useTemplateRef } from "vue"
import type { IUploadFile } from "@aiknew/shared-types"

export interface Props {
  editor: TipTapEditor
}

const adminFileModalRef = useTemplateRef("adminFileModal")

const { editor } = defineProps<Props>()

const handleClick = () => {
  adminFileModalRef.value?.show()
}

const handleSubmit = (files: IUploadFile[]) => {
  console.log("submit: ", files)
  const domStr = files.map((item) => `<img src=${item.filePath} />`).join("")
  editor.commands.insertContent(domStr)
}
</script>

<template>
  <div
    @click="handleClick"
    class="cursor-pointer rounded p-2 hover:bg-gray-200"
  >
    <ImagePlus class="h-4 w-4" />
  </div>
  <AdminFileModal ref="adminFileModal" @submit="handleSubmit" />
</template>
