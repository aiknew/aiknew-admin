<script setup lang="ts">
import { ElPopover, ElScrollbar, ElIcon } from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import { onMounted, ref } from "vue"

interface Props {
  visible: boolean
}

interface Emits {
  (e: "select", icon: string): void
}

const { visible } = defineProps<Props>()
const emit = defineEmits<Emits>()
const icons = ref<string[]>([])

const selectIcon = (iconName: string) => {
  emit("select", iconName)
}

onMounted(() => {
  for (const [key] of Object.entries(ElementPlusIconsVue)) {
    icons.value.push(key)
  }
})
</script>

<template>
  <el-popover width="50%" placement="bottom" trigger="click" :visible="visible">
    <template #reference>
      <div></div>
    </template>
    <template #default>
      <el-scrollbar height="30vh">
        <template v-for="icon in icons" :key="icon">
          <el-icon
            class="mx-1.5 cursor-pointer"
            size="26"
            @click="selectIcon(icon)"
          >
            <component :is="icon"></component>
          </el-icon>
        </template>
      </el-scrollbar>
    </template>
  </el-popover>
</template>

<style>
[id^="el-popper-container-"] {
  position: relative;
  z-index: 10000;
}
</style>
