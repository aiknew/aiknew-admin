<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { AlignJustify } from 'lucide-vue-next'

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <button
    @click="editor.chain().focus().setTextAlign('justify').run()"
    :class="{ 'btn-active': editor.isActive({ textAlign: 'justify' }) }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <AlignJustify class="w-4 h-4" />
  </button>
</template>
