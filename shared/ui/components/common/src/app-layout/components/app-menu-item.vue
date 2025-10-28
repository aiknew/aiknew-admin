<script lang="ts" setup>
import { computed } from "vue"

interface Props {
  title: string
  active?: boolean
}

const { title, active } = defineProps<Props>()
const activeClasses = computed(() => {
  return active
    ? "relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-3px] after:h-[2px] after:bg-theme-primary"
    : ""
})
</script>

<template>
  <div
    class="text-theme-text-primary hover:bg-theme-primary-light-9 mx-2 inline-flex h-full cursor-pointer select-none items-center justify-center px-6 py-2"
  >
    <div :class="activeClasses">
      {{ title }}
    </div>
  </div>
</template>
