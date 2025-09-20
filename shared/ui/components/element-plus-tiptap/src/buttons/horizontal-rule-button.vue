<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { Minus } from 'lucide-vue-next'

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <button @click="editor.chain().focus().setHorizontalRule().run()" class="p-2 rounded hover:bg-gray-200 cursor-pointer">
    <Minus class="w-4 h-4" />
  </button>
</template>
