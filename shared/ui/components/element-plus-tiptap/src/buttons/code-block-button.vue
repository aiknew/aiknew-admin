<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { Code } from "lucide-vue-next"

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().toggleCodeBlock().run()"
    :class="{ 'btn-active': editor.isActive('codeBlock') }"
    class="cursor-pointer rounded p-2 hover:bg-gray-200"
  >
    <Code class="h-4 w-4" />
  </div>
</template>
