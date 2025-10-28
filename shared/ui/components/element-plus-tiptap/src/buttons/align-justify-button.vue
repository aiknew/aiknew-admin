<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { AlignJustify } from "lucide-vue-next"

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().setTextAlign('justify').run()"
    :class="{ 'btn-active': editor.isActive({ textAlign: 'justify' }) }"
    class="cursor-pointer rounded p-2 hover:bg-gray-200"
  >
    <AlignJustify class="h-4 w-4" />
  </div>
</template>
