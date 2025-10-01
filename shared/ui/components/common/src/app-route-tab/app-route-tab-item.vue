<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { computed, onMounted, useTemplateRef, watch } from 'vue'

interface Props {
  active?: boolean
  path: string
  title: string
}

interface Emits {
  (e: 'left-click', path: string): void
  (e: 'close', path: string): void
}

const { active = false, title, path } = defineProps<Props>()
const emit = defineEmits<Emits>()
const itemRef = useTemplateRef<HTMLElement>('itemRef')
const activeClasses = computed(() => {
  return active
    ? [
        'bg-theme-primary-light-9',
        'dark:bg-theme-primary-light-9',
        'text-theme-primary',
        'border-none',
      ]
    : []
})

watch(
  () => active,
  (isActive) => {
    if (isActive) {
      scrollIntoView()
    }
  },
)

const handleClick = () => {
  emit('left-click', path)
}

const handleClose = (e: MouseEvent) => {
  e.stopPropagation()
  emit('close', path)
}

const scrollIntoView = () => {
  if (itemRef.value) {
    itemRef.value.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })
  }
}

onMounted(() => {
  scrollIntoView()
})

defineExpose({
  scrollIntoView,
})
</script>

<template>
  <div
    ref="itemRef"
    class="bg-[#efefef] dark:bg-[#222] shrink-0 mx-2 border-theme-border hover:bg-theme-primary-light-9 transition-all duration-300 rounded-md gap-1 inline-flex items-center px-6 cursor-pointer select-none"
    :class="activeClasses"
    @click="handleClick"
  >
    <span class="text-sm text-theme-text-primary leading-8">{{ title }}</span>

    <div
      class="transition-all relative left-2 hover:bg-theme-primary-light-7 rounded-full"
      @click="handleClose($event)"
    >
      <X :stroke-width="1" :size="14" color="#999" />
    </div>
  </div>
</template>
