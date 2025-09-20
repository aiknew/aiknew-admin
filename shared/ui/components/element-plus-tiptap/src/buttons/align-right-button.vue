<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { AlignRight } from 'lucide-vue-next'

interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <button
    @click="editor.chain().focus().setTextAlign('right').run()"
    :class="{ 'btn-active': editor.isActive({ textAlign: 'right' }) }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <AlignRight class="w-4 h-4" />
  </button>
</template>
