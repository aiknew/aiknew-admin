<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { useLangStore } from '@/stores/lang'
import { useRoute } from 'vue-router'
import { ElBreadcrumbItem, ElScrollbar, ElBreadcrumb } from 'element-plus'

const { getTranslationField } = useLangStore()
const route = useRoute()
const scrollbar = useTemplateRef<InstanceType<typeof ElScrollbar>>('scrollbar')
const moreLeftRef = ref<HTMLElement>()
const moreRightRef = ref<HTMLElement>()
const handleScroll = ({ scrollLeft }: { scrollLeft: number }) => {
  if (scrollLeft === 0) {
    // Reach the far left
    return moreLeftRef.value?.classList.add('no-more')
  }

  const wrapClientWidth = scrollbar.value?.wrapRef?.clientWidth ?? 0
  const wrapScrollWidth = scrollbar.value?.wrapRef?.scrollWidth ?? 0
  if (
    scrollLeft + wrapClientWidth >=
    wrapScrollWidth
  ) {
    // Reach the far right
    return moreRightRef.value?.classList.add('no-more')
  }

  moreLeftRef.value?.classList.remove('no-more')
  moreRightRef.value?.classList.remove('no-more')
}

</script>

<template>
  <div>
    <el-scrollbar @scroll="handleScroll" ref="scrollbar">
      <el-breadcrumb class="p-3" separator="/">
        <template v-for="(item, index) in route.matched" :key="item.path">
          <el-breadcrumb-item :to="{ path: item.path }" v-if="item.meta.translations && index !== 0">
            {{ getTranslationField(item.meta.translations, 'routeName').value }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </el-scrollbar>
    <div ref="moreLeftRef" class="route-path__more no-more"></div>
    <div ref="moreRightRef" class="route-path__more more-right"></div>
  </div>
</template>
