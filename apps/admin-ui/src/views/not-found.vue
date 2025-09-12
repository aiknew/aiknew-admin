<script lang="ts" setup>
import { ElButton, ElResult } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { push } = useRouter()
const { t } = useI18n()
</script>

<template>
  <el-result title="404" :sub-title="t('notFound.tips')">
    <template #extra>
      <el-button type="primary" @click="push('/')">
        {{ t('notFound.backToHome') }}
      </el-button>
    </template>
  </el-result>
</template>
