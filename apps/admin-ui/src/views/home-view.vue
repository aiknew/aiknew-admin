<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import AppLanguageSwitcher from '@/components/common/app-language-switcher.vue'

const { t } = useI18n()
const { push } = useRouter()
</script>

<template>
  <div>
    home
    <div class="mx-auto flex max-w-sm">test</div>
    <AppLanguageSwitcher />
    <ElButton @click="push('/')">test</ElButton>
    {{ t('addTitle') }}
  </div>
</template>

<i18n lang="yaml">
en:
  hello: hello world!
  test: fewafw
zh-CN:
  hello: 哈喽
  test: 測試測試
zh-TW:
  hello: 哈喽123
  test: 测试测试123
</i18n>
