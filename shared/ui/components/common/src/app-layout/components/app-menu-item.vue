<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  title: string
  active?: boolean
}

const { title, active } = defineProps<Props>()
const activeClasses = computed(() => {
  return active
    ? "relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-3px] after:h-[2px] after:bg-theme-primary"
    : ''
})
</script>

<template>
  <div
    class="py-2 px-6 mx-2 h-full inline-flex items-center justify-center select-none cursor-pointer text-theme-text-primary hover:bg-theme-primary-light-9"
  >
    <div :class="activeClasses">
      {{ title }}
    </div>
  </div>
</template>
