<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3"
import { onBeforeUnmount, watch } from "vue"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { TableKit } from "@tiptap/extension-table"
import { CharacterCount } from "@tiptap/extensions"
import ToolBar from "./tool-bar.vue"
import { type ToolBarProp } from "./types"
import Image from "@tiptap/extension-image"
import { type Extensions } from "@tiptap/core"
import { HTMLToProseMirrorNode } from "./utils"

interface Props {
  modelValue: string
  limit?: number
  toolbar?: ToolBarProp
}

interface Emits {
  (e: "update:modelValue", content: string): void
}

const {
  modelValue,
  limit = 500,
  toolbar = [
    ["bold", "italic", "underline", "font-size"],
    ["link", "strike", "highlight"],
    ["heading-1", "heading-2", "heading-3"],
    [
      "bullet-list",
      "ordered-list",
      "blockquote",
      "code-block",
      "horizontal-rule",
    ],
    ["align-left", "align-center", "align-right", "align-justify"],
    ["table"],
    ["undo", "redo"],
  ],
} = defineProps<Props>()
const emit = defineEmits<Emits>()

const extensions: Extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Highlight,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyleKit,
  TableKit,
  CharacterCount.configure({
    limit,
  }),
  Image,
]

const editor = useEditor({
  content: modelValue,
  onUpdate: () => {
    // HTML
    if (editor.value) {
      emit("update:modelValue", editor.value.getHTML())
    }

    // JSON
    // this.$emit('update:modelValue', this.editor.getJSON())
  },
  extensions,
  editorProps: {
    attributes: {
      class:
        "prose max-w-none focus:outline-none p-4 min-h-[200px] max-h-[500px] overflow-y-scroll",
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

const getChars = (html?: string) => {
  if (html) {
    return (
      editor.value?.storage.characterCount.characters({
        node: HTMLToProseMirrorNode(html, extensions),
      }) ?? 0
    )
  }

  return editor.value?.storage.characterCount.characters() ?? 0
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})

defineExpose({
  getChars,
})
</script>

<template>
  <div
    class="element-plus-tiptap overflow-hidden rounded-lg border border-gray-300"
  >
    <ToolBar class="border-b" v-if="editor" :toolbar :editor="editor" />
    <EditorContent :editor="editor" />
    <div
      v-if="editor"
      class="flex justify-end border-t border-gray-300 bg-gray-50 px-4 py-1 text-sm text-gray-500"
    >
      <span
        :class="{
          'text-red-500': getChars() >= limit,
        }"
      >
        {{ getChars() }} / {{ limit }} 字符
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.el-form-item.is-error .element-plus-tiptap {
  border-color: var(--el-color-danger);
}

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
      content: "";
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
