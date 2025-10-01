<script setup lang="ts">
import { toValue, useTemplateRef } from 'vue'
import AppTabItem from './app-route-tab-item.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { type RouteHistory } from '@aiknew/shared-ui-types'
import type { LocationQueryRaw } from 'vue-router'
import { resolveQueryStr } from '@aiknew/shared-ui-utils'

interface Props {
  history: RouteHistory[]
}

interface Emits {
  (e: 'remove', path: string): void
  (
    e: 'click',
    data: { path: string; query: LocationQueryRaw | undefined },
  ): void
}

const { history } = defineProps<Props>()
const emit = defineEmits<Emits>()
const currentRoutePath = defineModel<string>()
const tabRef = useTemplateRef<HTMLElement>('tabRef')

const handleWheel = (e: WheelEvent) => {
  if (!tabRef.value) return
  e.preventDefault()

  tabRef.value.scrollLeft += e.deltaY
}

const handleScroll = (position: 'left' | 'right') => {
  if (!tabRef.value) return
  const step = 150

  if (position === 'left') {
    tabRef.value.scrollLeft -= step
  } else {
    tabRef.value.scrollLeft += step
  }
}

const handleLeftClickItem = (path: string) => {
  const query = resolveQueryStr(path)

  emit('click', { path: path, query })
}

const handleCloseItem = (path: string) => {
  emit('remove', path)
}
</script>

<template>
  <div class="relative width-[44px]">
    <div
      class="scroll-smooth py-[6px] px-[28px] flex flex-nowrap items-center overflow-x-auto scrollbar-none"
      @wheel="handleWheel"
      ref="tabRef"
    >
      <div
        class="bg-theme-bg z-10 w-[28px] border-r border-gray-100 dark:border-theme-border absolute top-0 left-0 cursor-pointer h-full flex items-center justify-center select-none"
        @click="handleScroll('left')"
      >
        <ChevronLeft :stroke-width="1" color="#999" />
      </div>

      <AppTabItem
        v-for="item in history"
        :key="item.path"
        :path="item.path"
        :title="toValue(item.meta.name)"
        :active="item.path === currentRoutePath"
        @left-click="handleLeftClickItem"
        @close="handleCloseItem"
      />

      <div
        class="bg-theme-bg z-10 w-[28px] border-l border-gray-100 dark:border-theme-border absolute top-0 right-0 cursor-pointer h-full flex items-center justify-center select-none"
        @click="handleScroll('right')"
      >
        <ChevronRight :stroke-width="1" color="#999" />
      </div>
    </div>
  </div>
</template>
