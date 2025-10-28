<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import { BUTTON_MAP } from "./buttons"
import { type ToolBarProp } from "./types"

interface Props {
  editor: Editor
  toolbar?: ToolBarProp
}

const { toolbar, editor } = defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-2 border-gray-300 bg-gray-100 p-2"
  >
    <template v-for="(item, index) in toolbar">
      <component
        v-if="typeof item === 'string'"
        :key="item"
        :is="BUTTON_MAP[item]"
        :editor
      />

      <component
        v-else-if="typeof item === 'function'"
        :key="index"
        :is="item(editor)"
        :editor
      />

      <template v-else-if="Array.isArray(item)">
        <tool-bar :key="index" :editor :toolbar="item" />
        <div :key="`div-${index}`" class="mx-2 h-6 w-px bg-gray-300"></div>
      </template>
    </template>
  </div>
</template>

<style>
@reference "tailwindcss";

.btn-active {
  @apply bg-gray-300;
}
</style>
