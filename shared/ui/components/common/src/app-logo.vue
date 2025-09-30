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
