<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { ref, onMounted, onUnmounted } from "vue"
import { ElInputNumber } from "element-plus"

export interface Props {
  editor: Editor
}

const { editor } = defineProps<Props>()

const num = ref<number | null>(null)

const updateNumFromEditor = () => {
  const fontSize = editor.getAttributes("textStyle").fontSize
  if (fontSize) {
    const size = parseInt(fontSize, 10)
    num.value = isNaN(size) ? null : size
  } else {
    num.value = null
  }
}

const handleInputChange = (newSize: number | undefined) => {
  if (newSize) {
    editor.chain().focus().setFontSize(`${newSize}px`).run()
  } else {
    editor.chain().focus().unsetFontSize().run()
  }
}

onMounted(() => {
  editor.on("transaction", updateNumFromEditor)
  updateNumFromEditor()
})

onUnmounted(() => {
  editor.off("transaction", updateNumFromEditor)
})
</script>

<template>
  <el-input-number
    v-model="num"
    :min="12"
    controls-position="right"
    @change="handleInputChange"
    style="width: 110px"
  >
    <template #suffix>
      <span>px</span>
    </template>
  </el-input-number>
</template>

<style>
.el-input__wrapper {
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset !important;
}
</style>
