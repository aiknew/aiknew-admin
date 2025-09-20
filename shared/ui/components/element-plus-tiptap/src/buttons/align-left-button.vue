<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { AlignLeft } from 'lucide-vue-next'

interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <button
    @click="editor.chain().focus().setTextAlign('left').run()"
    :class="{ 'btn-active': editor.isActive({ textAlign: 'left' }) }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <AlignLeft class="w-4 h-4" />
  </button>
</template>
