<script setup lang="ts">
import { TipTap, type ToolBarProp } from '@aiknew/element-plus-tiptap'
import { defineAsyncComponent, h } from 'vue'

export type ToolBar = ToolBarProp

interface Props {
  toolbar?: ToolBarProp
}

const {
  toolbar = [
    ['bold', 'italic', 'underline', 'font-size'],
    ['link', 'strike', 'highlight'],
    ['heading-1', 'heading-2', 'heading-3'],
    ['bullet-list', 'ordered-list', 'blockquote', 'code-block', 'horizontal-rule'],
    ['align-left', 'align-center', 'align-right', 'align-justify'],
    ['table'],
    ['undo', 'redo'],
    [
      (editor) =>
        h(
          defineAsyncComponent(() => import('./menu-buttons/image-button.vue')),
          { editor }
        )
    ]
  ]
} = defineProps<Props>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <TipTap v-model="model" :toolbar />
</template>
