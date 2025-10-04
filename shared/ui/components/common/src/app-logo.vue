<script lang="ts" setup>
export interface Props {
  title: string
  expand?: boolean
}

const { expand = true } = defineProps<Props>()
</script>

<template>
  <div class="w-full h-[70px] flex px-[32px] items-center gap-2 shrink-0">
    <span class="size-8 rounded-full bg-theme-primary"></span>
    <Transition name="app-name">
      <span v-show="expand">{{ title }}</span>
    </Transition>
  </div>
</template>

<style>
.app-name-enter-active {
  transition: opacity 2s ease;
}

.app-name-leave-active {
  transition: opacity 0.7s ease;
}

.app-name-enter-from,
.app-name-leave-to {
  opacity: 0;
}

.app-name-enter-active,
.app-name-enter-from,
.app-name-left-from,
.app-name-leave-active {
  left: 72px;
  position: absolute;
  width: 200px;
}
</style>
