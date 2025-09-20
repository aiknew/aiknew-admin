<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { AlignCenter } from 'lucide-vue-next'

interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <button
    @click="editor.chain().focus().setTextAlign('center').run()"
    :class="{ 'btn-active': editor.isActive({ textAlign: 'center' }) }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <AlignCenter class="w-4 h-4" />
  </button>
</template>
