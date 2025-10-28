<script lang="ts" setup>
import { type Ref, useTemplateRef } from "vue"
import { type RouteLocationNormalizedLoadedGeneric } from "vue-router"
import { ElBreadcrumbItem, ElScrollbar, ElBreadcrumb } from "element-plus"
import { tField } from "@aiknew/shared-ui-locales"

export interface Props {
  currentRoute: Ref<RouteLocationNormalizedLoadedGeneric>
}

defineProps<Props>()

const scrollbarRef = useTemplateRef("scrollbar")
const moreLeftRef = useTemplateRef("moreLeft")
const moreRightRef = useTemplateRef("moreRight")
const handleScroll = ({ scrollLeft }: { scrollLeft: number }) => {
  if (scrollLeft === 0) {
    // Reach the far left
    return moreLeftRef.value?.classList.add("no-more")
  }

  const wrapClientWidth = scrollbarRef.value?.wrapRef?.clientWidth ?? 0
  const wrapScrollWidth = scrollbarRef.value?.wrapRef?.scrollWidth ?? 0
  if (scrollLeft + wrapClientWidth >= wrapScrollWidth) {
    // Reach the far right
    return moreRightRef.value?.classList.add("no-more")
  }

  moreLeftRef.value?.classList.remove("no-more")
  moreRightRef.value?.classList.remove("no-more")
}
</script>

<template>
  <div>
    <el-scrollbar @scroll="handleScroll" ref="scrollbar">
      <el-breadcrumb class="p-3" separator="/">
        <template
          v-for="(item, index) in currentRoute.value.matched"
          :key="item.path"
        >
          <el-breadcrumb-item
            :to="{ path: item.path }"
            v-if="item.meta.translations && index !== 0"
          >
            {{ tField(item.meta.translations, "routeName").value }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </el-scrollbar>
    <div ref="moreLeft" class="route-path__more no-more"></div>
    <div ref="moreRight" class="route-path__more more-right"></div>
  </div>
</template>

<style scoped>
:deep(.el-breadcrumb) {
  line-height: initial;
}
</style>
