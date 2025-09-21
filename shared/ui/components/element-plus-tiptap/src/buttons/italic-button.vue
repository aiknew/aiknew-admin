<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { Italic } from 'lucide-vue-next'

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().toggleItalic().run()"
    :class="{ 'btn-active': editor.isActive('italic') }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <Italic class="w-4 h-4" />
  </div>
</template>
