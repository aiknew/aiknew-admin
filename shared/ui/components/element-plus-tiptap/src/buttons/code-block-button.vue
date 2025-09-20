<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { Code } from 'lucide-vue-next'

interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <button
    @click="editor.chain().focus().toggleCodeBlock().run()"
    :class="{ 'btn-active': editor.isActive('codeBlock') }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <Code class="w-4 h-4" />
  </button>
</template>
