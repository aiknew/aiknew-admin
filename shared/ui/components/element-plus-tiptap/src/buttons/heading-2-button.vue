<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { Heading2 } from "lucide-vue-next"

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    :class="{ 'btn-active': editor.isActive('heading', { level: 2 }) }"
    class="cursor-pointer rounded p-2 hover:bg-gray-200"
  >
    <Heading2 class="h-4 w-4" />
  </div>
</template>
