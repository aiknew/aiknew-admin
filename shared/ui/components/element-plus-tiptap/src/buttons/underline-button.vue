<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { Underline } from "lucide-vue-next"

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().toggleUnderline().run()"
    :class="{ 'btn-active': editor.isActive('underline') }"
    class="cursor-pointer rounded p-2 hover:bg-gray-200"
  >
    <Underline class="h-4 w-4" />
  </div>
</template>
