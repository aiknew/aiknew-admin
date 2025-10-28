<script setup lang="ts">
import { TipTap, type ToolBarProp } from "@aiknew/element-plus-tiptap"
import { defineAsyncComponent, h, useTemplateRef } from "vue"

export type ToolBar = ToolBarProp

interface Props {
  toolbar?: ToolBarProp
}

const {
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
    [
      (editor) =>
        h(
          defineAsyncComponent(() => import("./menu-buttons/image-button.vue")),
          { editor },
        ),
    ],
  ],
} = defineProps<Props>()

const model = defineModel<string>({ default: "" })
const tiptapRef = useTemplateRef("tiptapRef")

defineExpose({
  getChars: (html?: string) => {
    return tiptapRef.value?.getChars(html)
  },
})
</script>

<template>
  <TipTap ref="tiptapRef" v-model="model" :toolbar />
</template>
