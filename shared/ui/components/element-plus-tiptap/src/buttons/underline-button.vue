<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { Underline } from 'lucide-vue-next'

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().toggleUnderline().run()"
    :class="{ 'btn-active': editor.isActive('underline') }"
    class="p-2 rounded hover:bg-gray-200 cursor-pointer"
  >
    <Underline class="w-4 h-4" />
  </div>
</template>
