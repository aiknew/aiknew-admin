<script setup lang="ts">
import { useLayoutSetting } from "@/stores/layout-setting"
import { Check } from "lucide-vue-next"

const layoutStore = useLayoutSetting()
</script>

<template>
  <div class="mt-3 flex flex-wrap gap-4">
    <!-- Vertical Layout -->
    <div
      @click="layoutStore.setLayout('vertical')"
      class="bg-theme-bg-page border-theme-primary size-15 relative flex"
    >
      <div class="bg-theme-primary w-[20%]"></div>
      <div class="flex grow flex-col"></div>
      <Check
        v-show="layoutStore.isVertical"
        class="text-theme-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      />
    </div>

    <!-- Horizontal Layout -->
    <div
      @click="layoutStore.setLayout('horizontal')"
      class="bg-theme-bg-page size-15 relative flex flex-col"
    >
      <div class="bg-theme-primary h-[16%]"></div>
      <div class="flex grow flex-col">
        <div class="grow"></div>
      </div>

      <Check
        v-show="layoutStore.isHorizontal"
        class="text-theme-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      />
    </div>

    <!-- Mixed Layout -->
    <div
      @click="layoutStore.setLayout('mixed')"
      class="bg-theme-bg-page size-15 relative flex flex-col"
    >
      <div class="bg-theme-primary h-[16%]"></div>
      <div class="flex grow flex-col">
        <div class="bg-theme-primary h-full w-[16%]"></div>
        <div class="grow"></div>
      </div>

      <Check
        v-show="layoutStore.isMixed"
        class="text-theme-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      />
    </div>
  </div>
</template>
