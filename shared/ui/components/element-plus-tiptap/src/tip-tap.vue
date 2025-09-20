<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, watch } from 'vue'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { TableKit } from '@tiptap/extension-table'
import { CharacterCount } from '@tiptap/extensions'
import ToolBar from './tool-bar.vue'

interface Props {
  modelValue: string
  limit?: number
}

interface Emits {
  (e: 'update:modelValue', content: string): void
}

const { modelValue, limit = 500 } = defineProps<Props>()
const emit = defineEmits<Emits>()

const editor = useEditor({
  content: modelValue,
  onUpdate: () => {
    // HTML
    if (editor.value) {
      emit('update:modelValue', editor.value.getHTML())
    }

    // JSON
    // this.$emit('update:modelValue', this.editor.getJSON())
  },
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Highlight,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TextStyleKit,
    TableKit,
    CharacterCount.configure({
      limit,
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose max-w-none focus:outline-none p-4 min-h-[200px]',
    },
  },
})

watch(
  () => modelValue,
  (value) => {
    // HTML
    const isSame = editor.value?.getHTML() === value

    // JSON
    // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

    if (isSame) {
      return
    }

    editor.value?.commands.setContent(value)
  },
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="border border-gray-300 rounded-lg overflow-hidden">
    <tool-bar v-if="editor" :editor="editor" />
    <editor-content :editor="editor" />
    <div
      v-if="editor"
      class="flex justify-end text-sm text-gray-500 px-4 py-1 bg-gray-50 border-t border-gray-300"
    >
      <span
        :class="{
          'text-red-500': editor.storage.characterCount.characters() >= limit,
        }"
      >
        {{ editor.storage.characterCount.characters() }} / {{ limit }} 字符
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.tiptap {
  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid var(--color-gray-300);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: var(--color-gray-100);
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: var(--color-gray-200);
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: var(--color-purple-300);
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}
</style>
