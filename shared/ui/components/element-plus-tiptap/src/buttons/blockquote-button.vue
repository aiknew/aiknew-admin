<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { Quote } from 'lucide-vue-next'

interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <button
    @click="editor.chain().focus().toggleBlockquote().run()"
    :class="{ 'btn-active': editor.isActive('blockquote') }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <Quote class="w-4 h-4" />
  </button>
</template>
