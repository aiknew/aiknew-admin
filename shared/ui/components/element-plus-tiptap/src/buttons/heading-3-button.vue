<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { Heading3 } from "lucide-vue-next"

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    :class="{ 'btn-active': editor.isActive('heading', { level: 3 }) }"
    class="cursor-pointer rounded p-2 hover:bg-gray-200"
  >
    <Heading3 class="h-4 w-4" />
  </div>
</template>
