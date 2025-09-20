<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import BoldButton from './buttons/bold-button.vue'
import ItalicButton from './buttons/italic-button.vue'
import UnderlineButton from './buttons/underline-button.vue'
import LinkButton from './buttons/link-button.vue'
import StrikeButton from './buttons/strike-button.vue'
import HighlightButton from './buttons/highlight-button.vue'
import Heading1Button from './buttons/heading-1-button.vue'
import Heading2Button from './buttons/heading-2-button.vue'
import Heading3Button from './buttons/heading-3-button.vue'
import BulletListButton from './buttons/bullet-list-button.vue'
import OrderedListButton from './buttons/ordered-list-button.vue'
import BlockquoteButton from './buttons/blockquote-button.vue'
import CodeBlockButton from './buttons/code-block-button.vue'
import HorizontalRuleButton from './buttons/horizontal-rule-button.vue'
import AlignLeftButton from './buttons/align-left-button.vue'
import AlignCenterButton from './buttons/align-center-button.vue'
import AlignRightButton from './buttons/align-right-button.vue'
import AlignJustifyButton from './buttons/align-justify-button.vue'
import UndoButton from './buttons/undo-button.vue'
import RedoButton from './buttons/redo-button.vue'
import TableButton from './buttons/table-button.vue'
import FontSizeButton from './buttons/font-size-button.vue'

interface Props {
  editor: Editor
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-2 p-2 bg-gray-100 border-b border-gray-300"
  >
    <bold-button :editor="editor" />
    <italic-button :editor="editor" />
    <underline-button :editor="editor" />
    <font-size-button :editor="editor" />

    <div class="w-px h-6 mx-2 bg-gray-300"></div>

    <link-button :editor="editor" />
    <strike-button :editor="editor" />
    <highlight-button :editor="editor" />

    <div class="w-px h-6 mx-2 bg-gray-300"></div>

    <heading-1-button :editor="editor" />
    <heading-2-button :editor="editor" />
    <heading-3-button :editor="editor" />

    <div class="w-px h-6 mx-2 bg-gray-300"></div>

    <bullet-list-button :editor="editor" />
    <ordered-list-button :editor="editor" />
    <blockquote-button :editor="editor" />
    <code-block-button :editor="editor" />
    <horizontal-rule-button :editor="editor" />

    <div class="w-px h-6 mx-2 bg-gray-300"></div>

    <align-left-button :editor="editor" />
    <align-center-button :editor="editor" />
    <align-right-button :editor="editor" />
    <align-justify-button :editor="editor" />

    <div class="w-px h-6 mx-2 bg-gray-300"></div>

    <table-button :editor="editor" />

    <div class="w-px h-6 mx-2 bg-gray-300"></div>

    <undo-button :editor="editor" />
    <redo-button :editor="editor" />
  </div>
</template>

<style>
@reference "tailwindcss";

.btn-active {
  @apply bg-gray-300;
}
</style>
