<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { ListOrdered } from 'lucide-vue-next'

interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <button
    @click="editor.chain().focus().toggleOrderedList().run()"
    :class="{ 'btn-active': editor.isActive('orderedList') }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <ListOrdered class="w-4 h-4" />
  </button>
</template>
