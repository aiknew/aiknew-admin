<script setup lang="ts">
import { ElDrawer, ElText } from 'element-plus'
import { Settings } from 'lucide-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppThemeSelect from './app-theme-select/app-theme-select.vue'
import { AppIcon } from '@aiknew/shared-ui-components'

const show = ref(false)
const { t } = useI18n()
</script>

<template>
  <div class="flex cursor-pointer items-center" @click="show = true">
    <AppIcon>
      <Settings :size="20" />
    </AppIcon>
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
