<script setup lang="ts">
import { ElIcon } from 'element-plus'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const handleClick = () => {
  toggleDark()
}
</script>

<template>
  <div class="flex cursor-pointer items-center" @click="handleClick">
    <el-icon size="20" v-show="isDark">
      <Moon />
    </el-icon>

    <el-icon size="22" v-show="!isDark">
      <Sunny />
    </el-icon>
  </div>
</template>
