<script setup lang="ts">
import { ElDrawer, ElText } from 'element-plus'
import { Settings } from 'lucide-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { AppIcon } from '@aiknew/shared-ui-components'
import AppThemeSelect from './app-theme-select/app-theme-select.vue'
import AppLayoutSelect from './app-layout-select.vue'

const show = ref(false)
const { t } = useI18n()
</script>

<template>
  <div class="flex cursor-pointer items-center" @click="show = true">
    <AppIcon>
      <Settings :size="20" />
    </AppIcon>
    <ElDrawer v-model="show" :with-header="false">
      <div>
        <div>
          <ElText tag="b">{{ t('pageLayout') }}</ElText>
          <AppLayoutSelect />
        </div>

        <div class="mt-8">
          <ElText tag="b">{{ t('themeColor') }}</ElText>
          <AppThemeSelect />
        </div>
      </div>
    </ElDrawer>
  </div>
</template>
