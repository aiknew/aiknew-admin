<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { Heading1 } from 'lucide-vue-next'

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <button
    @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    :class="{ 'btn-active': editor.isActive('heading', { level: 1 }) }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <Heading1 class="w-4 h-4" />
  </button>
</template>
