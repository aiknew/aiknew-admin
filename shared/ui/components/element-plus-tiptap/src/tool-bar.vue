<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { BUTTON_MAP, type buttons } from './buttons'

interface Props {
  editor: Editor
  toolbar: (buttons | buttons[])[]
}

const { toolbar, editor } = defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-2 p-2 bg-gray-100 border-b border-gray-300"
  >
    <template v-for="btnOrGroup in toolbar">
      <component
        v-if="typeof btnOrGroup === 'string'"
        :is="BUTTON_MAP[btnOrGroup]"
        :editor
      />

      <template v-else>
        <component v-for="btn in btnOrGroup" :is="BUTTON_MAP[btn]" :editor />
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
