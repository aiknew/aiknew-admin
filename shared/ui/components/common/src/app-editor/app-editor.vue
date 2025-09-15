<script setup lang="ts">
import FluentEditor from '@opentiny/fluent-editor'
import { onMounted, ref, watch } from 'vue'

interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', modelValue: string): void
}

const { modelValue } = defineProps<Props>()
const emit = defineEmits<Emits>()

let editor: FluentEditor
const editorRef = ref<HTMLElement>()

watch(
  () => modelValue,
  (newVal) => {
    if (!editor) return
    const editorContent = editor.root.innerHTML

    if (newVal !== editorContent) {
      editor.root.innerHTML = newVal
    }
  },
)

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['file', 'image', 'video'],

  // 配置自定义工具栏
  ['good'],
]

onMounted(() => {
  import('@opentiny/fluent-editor').then((module) => {
    if (!editorRef.value) return

    const FluentEditor = module.default

    const goodIcon = `<svg t="1734490908682" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5918" width="200" height="200"><path d="M881.066667 394.666667c-21.333333-23.466667-51.2-36.266667-81.066667-36.266667H618.666667v-117.333333c0-44.8-29.866667-85.333333-87.466667-117.333334-17.066667-10.666667-38.4-12.8-57.6-8.533333-19.2 4.266667-36.266667 17.066667-46.933333 34.133333-2.133333 2.133333-2.133333 4.266667-4.266667 6.4l-125.866667 281.6H204.8c-59.733333 0-108.8 46.933333-108.8 106.666667v258.133333c0 57.6 49.066667 106.666667 108.8 106.666667h544c53.333333 0 98.133333-38.4 106.666667-89.6l51.2-337.066667c4.266667-34.133333-6.4-64-25.6-87.466666z m-593.066667 448H204.8c-25.6 0-44.8-19.2-44.8-42.666667v-256c0-23.466667 19.2-42.666667 44.8-42.666667h83.2v341.333334z m554.666667-373.333334L789.333333 806.4c-4.266667 21.333333-21.333333 36.266667-42.666666 36.266667H352V471.466667l130.133333-290.133334c2.133333-4.266667 4.266667-4.266667 6.4-4.266666 2.133333 0 4.266667 0 8.533334 2.133333 25.6 14.933333 55.466667 38.4 55.466666 64v149.333333c0 17.066667 14.933333 32 32 32h213.333334c12.8 0 25.6 4.266667 34.133333 14.933334 8.533333 6.4 12.8 19.2 10.666667 29.866666z" fill="#666666" p-id="5919"></path></svg>`

    const icons = FluentEditor.import('ui/icons') as Record<string, string>
    icons.good = goodIcon
    const Parchment = FluentEditor.import('parchment')
    const GoodStyle = new Parchment.StyleAttributor('good', 'color', {
      scope: Parchment.Scope.INLINE,
    })
    FluentEditor.register('formats/good', GoodStyle)

    editor = new FluentEditor(editorRef.value, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: TOOLBAR_CONFIG,
          handlers: {
            good(value: boolean) {
              console.log('test', value)
            },
          },
        },
        counter: {
          count: 1000,
        },
      },
    })

    editor.on('text-change', () => {
      emit('update:modelValue', editor.root.innerHTML)
    })

    editor.root.innerHTML = modelValue
  })
})
</script>

<template>
  <div ref="editorRef"></div>
</template>

<style lang="scss">
@import '@opentiny/fluent-editor/style.css';
</style>
