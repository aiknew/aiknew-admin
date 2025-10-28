<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { Link } from "lucide-vue-next"
import { ElDropdown, ElDropdownMenu, ElButton, ElInput } from "element-plus"
import { ref, useTemplateRef } from "vue"

export interface Props {
  editor: Editor
}

const { editor } = defineProps<Props>()
const dropdownRef = useTemplateRef("dropdownRef")
const url = ref("")

const setLink = () => {
  // cancelled
  if (url.value === null) {
    return
  }

  // empty
  if (url.value === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run()
    return
  }

  // update link
  editor
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url.value })
    .run()

  dropdownRef.value?.handleClose()
}

const show = () => {
  url.value = editor.getAttributes("link").href
}
</script>

<template>
  <el-dropdown ref="dropdownRef" trigger="click" class="text-black!">
    <div
      @click="show"
      :class="{ 'btn-active': editor.isActive('link') }"
      class="cursor-pointer rounded p-2 hover:bg-gray-200"
    >
      <Link class="h-4 w-4" />
    </div>
    <template #dropdown>
      <el-dropdown-menu class="p-2!">
        <el-input
          autofocus
          clearable
          v-model="url"
          style="width: 240px"
          placeholder="URL"
          @keydown.enter.prevent="setLink"
        >
          <template #append>
            <el-button @click="setLink">Add</el-button></template
          >
        </el-input>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
