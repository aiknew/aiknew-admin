<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { Redo } from "lucide-vue-next"

export interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    @click="editor.chain().focus().redo().run()"
    class="cursor-pointer rounded p-2 hover:bg-gray-200"
  >
    <Redo class="h-4 w-4" />
  </div>
</template>
