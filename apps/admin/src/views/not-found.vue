<script lang="ts" setup>
import { ElButton, ElResult } from 'element-plus'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { push } = useRouter()
const { t } = useI18n()
</script>

<template>
  <el-result title="404" :sub-title="t('tips')">
    <template #extra>
      <el-button type="primary" @click="push('/')">
        {{ t('backToHome') }}
      </el-button>
    </template>
  </el-result>
</template>

<i18n>
  {
    "en": {
      "tips": "The page was not found",
      backToHome: 'Back to homepage'
    },

    "zh-CN": {
      "tips": "没有找到该页面",
      backToHome: '回到首页'
    },

    "zh-TW": {
      "tips": "沒有找到該頁面",
      backToHome: '回到首頁'
    }
  }
</i18n>
