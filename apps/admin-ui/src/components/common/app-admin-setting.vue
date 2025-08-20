<script setup lang="ts">
import { ElDrawer, ElIcon, ElText } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppThemeSelect from './app-theme-select/app-theme-select.vue'

const show = ref(false)
const { t } = useI18n()
</script>

<template>
  <div class="flex cursor-pointer items-center" @click="show = true">
    <el-icon size="20"><Setting /></el-icon>
    <el-drawer v-model="show" :with-header="false">
      <div>
        <el-text tag="b">{{ t('themeColor') }}</el-text>

        <AppThemeSelect />
      </div>
    </el-drawer>
  </div>
</template>

<i18n lang="yaml">
en:
  themeColor: Theme color
zh-TW:
  themeColor: 主題顏色
zh-CN:
  themeColor: 主题颜色
</i18n>
