<script lang="ts" setup>
import { useRouter } from 'vue-router'
import AppRecursiveMenu from './app-recursive-menu.vue'
import { ElMenu } from 'element-plus'
import { useRoute } from 'vue-router'

interface Props {
  expand?: boolean
}

interface Emits {
  (e: 'update:expand', expand: boolean): void
}

const { expand = true } = defineProps<Props>()
defineEmits<Emits>()
const route = useRoute()
const router = useRouter()

const rootRoute = router.getRoutes().find((item) => item.name === 'Index')
const routes = rootRoute ? rootRoute.children : []
</script>

<template>
  <aside
    class="linear fixed top-0 left-0 z-10 inline-flex h-full min-h-screen max-w-[220px] shrink-0 origin-center overflow-hidden border-r border-stone-50 bg-white px-4 transition md:relative"
    :class="[expand ? '' : '-translate-x-100 md:-translate-x-0']"
  >
    <ElMenu
      class="w-[220px] border-r-0!"
      :default-active="route.fullPath"
      :collapse="!expand"
      router
    >
      <AppRecursiveMenu :routes />
    </ElMenu>
  </aside>

  <div
    class="fixed top-0 left-0 z-5 h-full w-full bg-black opacity-10 md:hidden"
    :class="[expand ? 'block' : 'hidden']"
    @click="$emit('update:expand', false)"
  ></div>
</template>
