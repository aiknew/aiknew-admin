<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useDark, useToggle } from '@vueuse/core'
import AppIcon from './app-icon.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const handleClick = () => {
  toggleDark()
}
</script>

<template>
  <div class="flex items-center" @click="handleClick">
    <AppIcon v-show="isDark">
      <Moon :size="20" />
    </AppIcon>

    <AppIcon v-show="!isDark">
      <Sun :size="20" />
    </AppIcon>
  </div>
</template>
