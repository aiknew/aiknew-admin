<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { ListOrdered } from "lucide-vue-next"

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().toggleOrderedList().run()"
    :class="{ 'btn-active': editor.isActive('orderedList') }"
    class="cursor-pointer rounded p-2 hover:bg-gray-200"
  >
    <ListOrdered class="h-4 w-4" />
  </div>
</template>
