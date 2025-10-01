import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Layouts } from '@aiknew/shared-ui-constants'

export const useLayoutSetting = defineStore('layoutSetting', () => {
  const currentLayout = ref<keyof typeof Layouts>('vertical')

  const isVertical = computed(() => {
    return currentLayout.value === Layouts.vertical
  })

  const isHorizontal = computed(() => {
    return currentLayout.value === Layouts.horizontal
  })

  const setLayout = (layout: keyof typeof Layouts) => {
    currentLayout.value = layout
  }

  return {
    layoutList: Object.keys(Layouts),
    currentLayout,
    isVertical,
    isHorizontal,
    setLayout,
  }
})
