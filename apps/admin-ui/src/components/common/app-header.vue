<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { Expand, Fold } from '@element-plus/icons-vue'
import AppRoutePath from './app-route-path.vue'
import AppLanguageSwitcher from './app-language-switcher.vue'
import AppUserSetting from './app-user-setting.vue'

defineProps({
  expandMenu: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['update:expandMenu'])
</script>

<template>
  <header class="bg-white-100 flex min-h-10 items-center p-3">
    <!-- logo -->
    <div class="mr-1 flex size-9 items-center justify-center border md:hidden">logo</div>

    <!-- menu expand button -->
    <div
      class="flex cursor-pointer items-center justify-center"
      @click="$emit('update:expandMenu', !expandMenu)"
    >
      <el-icon v-show="!expandMenu" :size="26">
        <Expand />
      </el-icon>
      <el-icon v-show="expandMenu" :size="26">
        <Fold />
      </el-icon>
    </div>

    <!-- route path -->
    <AppRoutePath />

    <!-- operations -->
    <div class="ml-auto flex grow items-center space-x-2">
      <!-- language switcher -->
      <AppLanguageSwitcher />

      <!-- user info -->
      <AppUserSetting />
    </div>
  </header>
</template>
