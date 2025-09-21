<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { BUTTON_MAP } from './buttons'
import { ToolBarProp } from './types'

interface Props {
  editor: Editor
  toolbar?: ToolBarProp
}

const { toolbar, editor } = defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-2 p-2 bg-gray-100 border-gray-300"
  >
    <template v-for="item in toolbar">
      <component
        v-if="typeof item === 'string'"
        :is="BUTTON_MAP[item]"
        :editor
      />

      <component
        v-else-if="typeof item === 'function'"
        :is="item(editor)"
        :editor
      />

      <template v-else-if="Array.isArray(item)">
        <tool-bar :editor :toolbar="item" />
        <div class="w-px h-6 mx-2 bg-gray-300"></div>
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
