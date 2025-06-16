<script setup lang="ts">
import { useEditor, EditorContent, type Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { onBeforeUnmount, watch, type ShallowRef } from 'vue'

interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', content: string): void
}

let editor: ShallowRef<Editor | undefined>
const { modelValue } = defineProps<Props>()
const emit = defineEmits<Emits>()

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

    editor.value?.commands.setContent(value, false)
  }
)

editor = useEditor({
  content: modelValue,
  extensions: [StarterKit],
  onUpdate: () => {
    // HTML
    emit('update:modelValue', editor.value?.getHTML() ?? '')

    // JSON
    // this.$emit('update:modelValue', this.editor.getJSON())
  }
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<template>
  <editor-content :editor="editor" />
</template>
