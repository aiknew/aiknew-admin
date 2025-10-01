<script setup lang="ts">
import { useLayoutSetting } from '@/stores/layout-setting'
import { Check } from 'lucide-vue-next'

const layoutStore = useLayoutSetting()
</script>

<template>
  <div class="mt-3 flex gap-4">
    <!-- Vertical Layout -->
    <div
      @click="layoutStore.setLayout('vertical')"
      class="bg-theme-bg-page border-theme-primary relative flex size-15"
    >
      <div class="bg-theme-primary w-[20%]"></div>
      <div class="flex grow flex-col"></div>
      <Check
        v-show="layoutStore.isVertical"
        class="text-theme-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      />
    </div>

    <!-- Horizontal Layout -->
    <div
      @click="layoutStore.setLayout('horizontal')"
      class="bg-theme-bg-page relative flex size-15 flex-col"
    >
      <div class="bg-theme-primary h-[16%]"></div>
      <div class="flex grow flex-col">
        <div class="bg-theme-primary h-full w-[16%]"></div>
        <div class="grow"></div>
      </div>

      <Check
        v-show="layoutStore.isHorizontal"
        class="text-theme-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      />
    </div>
  </div>
</template>
