<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="content"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor-next/editor/dist/css/style.css'
import { onBeforeUnmount, shallowRef } from 'vue'
import { type IDomEditor } from '@wangeditor-next/editor'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'

const mode = 'default'
const content = defineModel<string>()
const editorRef = shallowRef<IDomEditor>()
const toolbarConfig = {}
const editorConfig = { placeholder: '' }

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}

onBeforeUnmount(() => {
  // destroy editor instance
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>
