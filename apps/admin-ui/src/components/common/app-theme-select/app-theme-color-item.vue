<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string
  color: string
  currentThemeColor: string | undefined
}

interface Emits {
  (e: 'select', color: string): void
}

const { text, color, currentThemeColor } = defineProps<Props>()
const emit = defineEmits<Emits>()

const active = computed(() => {
  return color === currentThemeColor
})
</script>

<template>
  <div @click="emit('select', color)">
    <div
      :class="{ active }"
      class="rounded-md border border-[var(--el-border-color-darker)] p-[4px]"
    >
      <div
        class="flex h-[32px] w-full min-w-12 flex-col items-center"
        :style="{ backgroundColor: color }"
      >
        <slot></slot>
      </div>
    </div>

    <span
      size="small"
      class="mt-[2px] block w-full text-center text-[12px] text-[var(--el-text-color-regular)]"
    >
      {{ text }}
    </span>
  </div>
</template>

<style scoped>
.active {
  box-shadow: 0px 0px 0px 2px var(--el-color-primary) inset;
}
</style>
