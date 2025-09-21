<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { Heading3 } from 'lucide-vue-next'

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    :class="{ 'btn-active': editor.isActive('heading', { level: 3 }) }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <Heading3 class="w-4 h-4" />
  </div>
</template>
